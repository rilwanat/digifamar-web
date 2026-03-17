<?php


use Firebase\JWT\JWT;

require_once __DIR__ . '/../vendor/autoload.php'; // Adjust path based on your structure
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


class Response
{
    private $conn;
    private $secret_key;


    private $users_table = "dgf_users";
    private $users_tokens_table = "users_tokens_table";
    private $users_subscriptions_table = "users_subscribe_table";

    private $farmers_table = "dgf_farmers";
    private $farmers_tokens_table = "farmers_tokens_table";
    private $farmers_subscriptions_table = "farmers_subscribe_table";

    private $admins_table = "dgf_admins";




    private $dgf_messages_table = "dgf_messages";
    private $dgf_messages_reads_table = "dgf_messages_reads";
    private $dgf_messages_attachments_table = "dgf_messages_attachments";





    public function __construct($db)
    {
        $this->conn = $db;
        $this->secret_key = $_ENV['DGF_SECRET_ENCRYPTION_KEY'];
    }


    // Function to generate authentication token
    function generateAuthToken()
    {
        // Token expiration time (e.g., 1 hour from now)
        $expirationTime = time() + 2592000; //3600; 60*60*24*30 = 1 month

        // JWT payload
        $payload = array(
            "iat" => time(), // Issued at: time when the token was generated
            "exp" => $expirationTime, // Expiration time
            // Add any additional claims here
        );

        // Generate the JWT
        $jwt = JWT::encode($payload, $this->secret_key, 'HS256');

        return $jwt;
    }


    function validatePassword($password)
    {
        $errors = [];

        // Check password length (minimum 4 characters)
        if (strlen($password) < 4) {
            $errors[] = "Password must be at least 4 characters long.";
        }

        // // Check for at least one uppercase letter
        // if (!preg_match('/[A-Z]/', $password)) {
        //     $errors[] = "Password must contain at least one uppercase letter.";
        // }

        // // Check for at least one lowercase letter
        // if (!preg_match('/[a-z]/', $password)) {
        //     $errors[] = "Password must contain at least one lowercase letter.";
        // }

        // // Check for at least one number
        // if (!preg_match('/[0-9]/', $password)) {
        //     $errors[] = "Password must contain at least one number.";
        // }

        // // Check for at least one special character
        // if (!preg_match('/[\W]/', $password)) {
        //     $errors[] = "Password must contain at least one special character.";
        // }

        return empty($errors) ? true : $errors;
    }

    // USER REGISTRATION    
    public function checkIfUserExists($email_address)
    {
        // Check if the user already exists
        $query_check = "SELECT id FROM " . $this->users_table . " WHERE email_address = :email_address";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email_address", $email_address);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // User already exists
            return true;
        } else {
            // User does not exist
            return false;
        }
    }
    private function generateUserDGFID()
    {
        // Get last ID
        $stmt = $this->conn->query("SELECT dgf_id FROM " . $this->users_table . " ORDER BY id DESC LIMIT 1");
        $last = $stmt->fetchColumn();

        if (!$last) {
            return "DGF-U000001";
        }

        // Extract number from TMFxxxxx
        $number = intval(substr($last, 3)) + 1;

        return "DGF-U" . str_pad($number, 6, "0", STR_PAD_LEFT);
    }
    public function createUser(
        $first_name,
        $last_name,
        $email_address,
        $password
    ) {

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);


        // ----------------------------------------------------------
        // 1. INSERT USER
        // ----------------------------------------------------------
        // error_log("Step 5: Inserting Member...");

        $dgf_id = $this->generateUserDGFID();

        $query = "INSERT INTO " . $this->users_table . " SET 
        dgf_id = :dgf_id,
        firstname = :first_name,
        lastname = :last_name,
        email_address = :email,
        password = :password 
    ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":dgf_id", $dgf_id);
        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":email", $email_address);
        $stmt->bindParam(":password", $hashed_password);

        $exec = $stmt->execute();

        // error_log("Insert Execute Result: " . json_encode($exec));

        if ($exec) {
            // error_log("✅ Member created successfully!");
            return $this->generateAuthToken();
        }

        error_log("❌ DB ERROR: " . implode(" | ", $stmt->errorInfo()));
        return false;
    }

    public function InsertEmailTokenForUser($email_address, $random_token)
    {
        // $customer_id = strval(time());

        $query = "INSERT INTO " . $this->users_tokens_table . " SET             
            
            token_for=:token_for,
            email_token=:email_token
            ";

        // prepare query
        $stmt = $this->conn->prepare($query);


        $stmt->bindParam(":token_for", $email_address);
        $stmt->bindParam(":email_token", $random_token);


        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false; // User creation failed
    }
    public function checkIfEmailCodeIsValidForUser($email_address, $verification_code)
    {
        // Get the most recent token for this email_address
        $query = "SELECT email_token 
              FROM " . $this->users_tokens_table . " 
              WHERE token_for = :email_address 
              ORDER BY date DESC 
              LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email_address", $email_address);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);

            // Compare the tokens directly (case-sensitive exact match)
            if ($tokenData['email_token'] === $verification_code) {
                // Token is valid - you may want to delete it here to prevent reuse
                // $this->deleteToken($email_address, $verification_code);


                $yes = "Yes";
                // Token is valid - update verification status
                $query = "UPDATE " . $this->users_table . " 
                      SET email_verified = :email_verified
                      WHERE email_address = :email_address";

                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":email_address", $email_address);
                $stmt->bindParam(":email_verified", $yes);

                if ($stmt->execute()) {
                    return true;
                }
            }
        }

        return false;
    }
    public function CreateSubscribeForUser($email_address)
    {
        // First check if email_address already exists
        $check_query = "SELECT COUNT(*) as email_count 
                   FROM " . $this->users_subscriptions_table . " 
                   WHERE email_address = :email_address";

        $check_stmt = $this->conn->prepare($check_query);
        $check_stmt->bindParam(":email_address", $email_address);
        $check_stmt->execute();

        $result = $check_stmt->fetch(PDO::FETCH_ASSOC);

        // If email_address exists, return false
        if ($result && $result['email_count'] > 0) {
            return false;
        }

        // If email_address doesn't exist, proceed with insertion
        $insert_query = "INSERT INTO " . $this->users_subscriptions_table . " 
                    SET email_address = :email_address";

        $insert_stmt = $this->conn->prepare($insert_query);
        $insert_stmt->bindParam(":email_address", $email_address);

        return $insert_stmt->execute();
    }

    public function checkIfUserCredentialsIsValid($email_address, $raw_password)
    {
        // Check if the user exists
        $query_check = "SELECT id, password FROM " . $this->users_table . " WHERE email_address = :email_address";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email_address", $email_address);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // Fetch the user's record
            $user = $stmt_check->fetch(PDO::FETCH_ASSOC);
            $hashed_password = $user['password'];

            // Verify the password
            if (password_verify($raw_password, $hashed_password)) {
                // Password is correct, generate authentication token
                $authToken = $this->generateAuthToken();
                return $authToken;
            } else {
                // Password is incorrect
                return false;
            }
        } else {
            // User does not exist
            return false;
        }
    }
    public function ReadUser($email_address)
    {
        try {
            // 
            $query = "
            SELECT
                m.id,
                m.dgf_id,
                
                -- Basic Info
                m.firstname,
                m.lastname,
                m.middlename,
                m.gender,
                m.email_address,
                m.email_verified,
                -- m.password,
                m.phone_number,
                m.address,    
                m.date_of_birth,            
                m.profile_image,

                m.status,     
                m.registration_source,           
                m.registration_date,
                m.last_login,
                m.referral_code,
                m.extra_data,

                -- Timestamps
                m.created_at,
                m.updated_at

            FROM " . $this->users_table . " m


            WHERE m.email_address = :email_address
            LIMIT 1
        ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email_address', $email_address, PDO::PARAM_STR);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            return $user ?: null;
        } catch (Exception $e) {
            return null;
        }
    }
    public function ReadUserById($user_id)
    {
        try {
            $query = "SELECT 
                m.id,
                m.dgf_id,
                
                -- Basic Info
                m.firstname,
                m.lastname,
                m.middlename,
                m.gender,
                m.email_address,
                m.email_verified,
                -- m.password,
                m.phone_number,
                m.address,
                m.date_of_birth,
                m.profile_image,

                -- Membership Info
                m.status,
                m.registration_source,
                m.registration_date,
                m.last_login,
                m.referral_code,
                m.extra_data,

                -- Timestamps
                m.created_at,
                m.updated_at 

                FROM " . $this->users_table . " m


                WHERE m.id = :user_id
                ORDER BY m.registration_date DESC 
                LIMIT 1";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch one record as associative array
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            return $row ? $row : null;
        } catch (Exception $e) {
            return null;
        }
    }
    // USER REGISTRATION


    // FARMER REGISTRATION    
    public function checkIfFarmerExists($email_address)
    {
        // Check if the user already exists
        $query_check = "SELECT id FROM " . $this->farmers_table . " WHERE email_address = :email_address";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email_address", $email_address);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // User already exists
            return true;
        } else {
            // User does not exist
            return false;
        }
    }
    private function generateFarmerDGFID()
    {
        // Get last ID
        $stmt = $this->conn->query("SELECT dgf_id FROM " . $this->farmers_table . " ORDER BY id DESC LIMIT 1");
        $last = $stmt->fetchColumn();

        if (!$last) {
            return "DGF-F000001";
        }

        // Extract number from TMFxxxxx
        $number = intval(substr($last, 3)) + 1;

        return "DGF-F" . str_pad($number, 6, "0", STR_PAD_LEFT);
    }
    public function createFarmer(
        $first_name,
        $last_name,
        $email_address,
        $password
    ) {

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);


        // ----------------------------------------------------------
        // 1. INSERT USER
        // ----------------------------------------------------------
        // error_log("Step 5: Inserting Member...");

        $dgf_id = $this->generateFarmerDGFID();

        $query = "INSERT INTO " . $this->farmers_table . " SET 
        dgf_id = :dgf_id,
        firstname = :first_name,
        lastname = :last_name,
        email_address = :email,
        password = :password 
    ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":dgf_id", $dgf_id);
        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":email", $email_address);
        $stmt->bindParam(":password", $hashed_password);

        $exec = $stmt->execute();

        // error_log("Insert Execute Result: " . json_encode($exec));

        if ($exec) {
            // error_log("✅ Member created successfully!");
            return $this->generateAuthToken();
        }

        error_log("❌ DB ERROR: " . implode(" | ", $stmt->errorInfo()));
        return false;
    }

    public function InsertEmailTokenForFarmer($email_address, $random_token)
    {
        // $customer_id = strval(time());

        $query = "INSERT INTO " . $this->farmers_tokens_table . " SET             
            
            token_for=:token_for,
            email_token=:email_token
            ";

        // prepare query
        $stmt = $this->conn->prepare($query);


        $stmt->bindParam(":token_for", $email_address);
        $stmt->bindParam(":email_token", $random_token);


        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false; // User creation failed
    }
    public function checkIfEmailCodeIsValidForFarmer($email_address, $verification_code)
    {
        // Get the most recent token for this email_address
        $query = "SELECT email_token 
              FROM " . $this->farmers_tokens_table . " 
              WHERE token_for = :email_address 
              ORDER BY date DESC 
              LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email_address", $email_address);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);

            // Compare the tokens directly (case-sensitive exact match)
            if ($tokenData['email_token'] === $verification_code) {
                // Token is valid - you may want to delete it here to prevent reuse
                // $this->deleteToken($email_address, $verification_code);


                $yes = "Yes";
                // Token is valid - update verification status
                $query = "UPDATE " . $this->farmers_table . " 
                      SET email_verified = :email_verified
                      WHERE email_address = :email_address";

                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":email_address", $email_address);
                $stmt->bindParam(":email_verified", $yes);

                if ($stmt->execute()) {
                    return true;
                }
            }
        }

        return false;
    }
    public function CreateSubscribeForFarmer($email_address)
    {
        // First check if email_address already exists
        $check_query = "SELECT COUNT(*) as email_count 
                   FROM " . $this->farmers_subscriptions_table . " 
                   WHERE email_address = :email_address";

        $check_stmt = $this->conn->prepare($check_query);
        $check_stmt->bindParam(":email_address", $email_address);
        $check_stmt->execute();

        $result = $check_stmt->fetch(PDO::FETCH_ASSOC);

        // If email_address exists, return false
        if ($result && $result['email_count'] > 0) {
            return false;
        }

        // If email_address doesn't exist, proceed with insertion
        $insert_query = "INSERT INTO " . $this->farmers_subscriptions_table . " 
                    SET email_address = :email_address";

        $insert_stmt = $this->conn->prepare($insert_query);
        $insert_stmt->bindParam(":email_address", $email_address);

        return $insert_stmt->execute();
    }

    public function checkIfFarmerCredentialsIsValid($email_address, $raw_password)
    {
        // Check if the user exists
        $query_check = "SELECT id, password FROM " . $this->farmers_table . " WHERE email_address = :email_address";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email_address", $email_address);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // Fetch the user's record
            $user = $stmt_check->fetch(PDO::FETCH_ASSOC);
            $hashed_password = $user['password'];

            // Verify the password
            if (password_verify($raw_password, $hashed_password)) {
                // Password is correct, generate authentication token
                $authToken = $this->generateAuthToken();
                return $authToken;
            } else {
                // Password is incorrect
                return false;
            }
        } else {
            // User does not exist
            return false;
        }
    }
    public function ReadFarmer($email_address)
    {
        try {
            // 
            $query = "
            SELECT
                m.id,
                m.dgf_id,
                
                -- Basic Info
                m.firstname,
                m.lastname,
                m.middlename,
                m.gender,
                m.email_address,
                m.email_verified,
                -- m.password,
                m.phone_number,
                m.address,    
                m.date_of_birth,            
                m.profile_image,

                m.status,     
                m.registration_source,           
                m.registration_date,
                m.last_login,
                m.referral_code,
                m.extra_data,

                -- Timestamps
                m.created_at,
                m.updated_at

            FROM " . $this->farmers_table . " m


            WHERE m.email_address = :email_address
            LIMIT 1
        ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email_address', $email_address, PDO::PARAM_STR);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            return $user ?: null;
        } catch (Exception $e) {
            return null;
        }
    }
    public function ReadFarmerById($user_id)
    {
        try {
            $query = "SELECT 
                m.id,
                m.dgf_id,
                
                -- Basic Info
                m.firstname,
                m.lastname,
                m.middlename,
                m.gender,
                m.email_address,
                m.email_verified,
                -- m.password,
                m.phone_number,
                m.address,
                m.date_of_birth,
                m.profile_image,

                -- Membership Info
                m.status,
                m.registration_source,
                m.registration_date,
                m.last_login,
                m.referral_code,
                m.extra_data,

                -- Timestamps
                m.created_at,
                m.updated_at 

                FROM " . $this->farmers_table . " m


                WHERE m.id = :user_id
                ORDER BY m.registration_date DESC 
                LIMIT 1";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch one record as associative array
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            return $row ? $row : null;
        } catch (Exception $e) {
            return null;
        }
    }
    // FARMER REGISTRATION


    // ADMIN REGISTRATION    
    public function checkIfAdminExists($email_address)
    {
        // Check if the user already exists
        $query_check = "SELECT id FROM " . $this->admins_table . " WHERE email_address = :email_address";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email_address", $email_address);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // User already exists
            return true;
        } else {
            // User does not exist
            return false;
        }
    }
    private function generateAdminDGFID()
    {
        // Get last ID
        $stmt = $this->conn->query("SELECT dgf_id FROM " . $this->admins_table . " ORDER BY id DESC LIMIT 1");
        $last = $stmt->fetchColumn();

        if (!$last) {
            return "DGF-A000001";
        }

        // Extract number from TMFxxxxx
        $number = intval(substr($last, 3)) + 1;

        return "DGF-A" . str_pad($number, 6, "0", STR_PAD_LEFT);
    }
    public function createAdmin(
        $first_name,
        $last_name,
        $email_address,
        $password
    ) {

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);


        // ----------------------------------------------------------
        // 1. INSERT USER
        // ----------------------------------------------------------
        // error_log("Step 5: Inserting Member...");

        $dgf_id = $this->generateAdminDGFID();

        $query = "INSERT INTO " . $this->admins_table . " SET 
        dgf_id = :dgf_id,
        firstname = :first_name,
        lastname = :last_name,
        email_address = :email,
        password = :password 
    ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":dgf_id", $dgf_id);
        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":email", $email_address);
        $stmt->bindParam(":password", $hashed_password);

        $exec = $stmt->execute();

        // error_log("Insert Execute Result: " . json_encode($exec));

        if ($exec) {
            // error_log("✅ Member created successfully!");
            return $this->generateAuthToken();
        }

        error_log("❌ DB ERROR: " . implode(" | ", $stmt->errorInfo()));
        return false;
    }


    public function checkIfAdminCredentialsIsValid($email_address, $raw_password)
    {
        // Check if the user exists
        $query_check = "SELECT id, password FROM " . $this->admins_table . " WHERE email_address = :email_address";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email_address", $email_address);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // Fetch the user's record
            $user = $stmt_check->fetch(PDO::FETCH_ASSOC);
            $hashed_password = $user['password'];

            // Verify the password
            if (password_verify($raw_password, $hashed_password)) {
                // Password is correct, generate authentication token
                $authToken = $this->generateAuthToken();
                return $authToken;
            } else {
                // Password is incorrect
                return false;
            }
        } else {
            // User does not exist
            return false;
        }
    }
    public function ReadAdmin($email_address)
    {
        try {
            // 
            $query = "
            SELECT
                m.id,
                m.dgf_id,
                
                -- Basic Info
                m.firstname,
                m.lastname,
                m.middlename,
                m.gender,
                m.email_address,
                m.email_verified,
                -- m.password,
                m.phone_number,
                m.address,    
                m.date_of_birth,            
                m.profile_image,

                m.status,     
                m.registration_source,           
                m.registration_date,
                m.last_login,
                m.referral_code,
                m.extra_data,

                -- Timestamps
                m.created_at,
                m.updated_at

            FROM " . $this->admins_table . " m


            WHERE m.email_address = :email_address
            LIMIT 1
        ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email_address', $email_address, PDO::PARAM_STR);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            return $user ?: null;
        } catch (Exception $e) {
            return null;
        }
    }
    public function ReadAdminById($user_id)
    {
        try {
            $query = "SELECT 
                m.id,
                m.dgf_id,
                
                -- Basic Info
                m.firstname,
                m.lastname,
                m.middlename,
                m.gender,
                m.email_address,
                m.email_verified,
                -- m.password,
                m.phone_number,
                m.address,
                m.date_of_birth,
                m.profile_image,

                -- Membership Info
                m.status,
                m.registration_source,
                m.registration_date,
                m.last_login,
                m.referral_code,
                m.extra_data,

                -- Timestamps
                m.created_at,
                m.updated_at 

                FROM " . $this->admins_table . " m


                WHERE m.id = :user_id
                ORDER BY m.registration_date DESC 
                LIMIT 1";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch one record as associative array
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            return $row ? $row : null;
        } catch (Exception $e) {
            return null;
        }
    }
    // ADMIN REGISTRATION



    // MAIL UNICAST & BROADCAST
    public function createMessage(
        $sender_id,
        $sender_type,
        $receiver_id = null,
        $receiver_type = null,
        $message,
        $delivery_type = 'unicast', // 'unicast' or 'broadcast'
        $subject = null
    ) {
        try {
            // 1️⃣ Validate delivery_type
            if (!in_array($delivery_type, ['unicast', 'broadcast'])) {
                return ["status" => false, "error" => "INVALID_DELIVERY_TYPE"];
            }

            // 2️⃣ Insert message
            $query = "
            INSERT INTO " . $this->dgf_messages_table . " SET
                sender_id = :sender_id,
                sender_type = :sender_type,
                receiver_id = :receiver_id,
                receiver_type = :receiver_type,
                delivery_type = :delivery_type,
                subject = :subject,
                message = :message,
                is_encrypted = 0,
                has_attachment = 0,
                created_at = NOW()
        ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":sender_id", $sender_id);
            $stmt->bindValue(":sender_type", $sender_type);
            $stmt->bindValue(":receiver_id", $receiver_id);
            $stmt->bindValue(":receiver_type", $receiver_type);
            $stmt->bindValue(":delivery_type", $delivery_type);
            $stmt->bindValue(":subject", $subject);
            $stmt->bindValue(":message", $message);

            $stmt->execute();
            $message_id = $this->conn->lastInsertId();

            // 3️⃣ If unicast, create read entry for receiver
            if ($delivery_type === 'unicast' && $receiver_id && $receiver_type) {
                $readQuery = "
                INSERT INTO " . $this->dgf_messages_reads_table . " SET
                    message_id = :message_id,
                    receiver_id = :receiver_id,
                    receiver_type = :receiver_type,
                    is_read = 0
            ";
                $stmt2 = $this->conn->prepare($readQuery);
                $stmt2->bindValue(":message_id", $message_id);
                $stmt2->bindValue(":receiver_id", $receiver_id);
                $stmt2->bindValue(":receiver_type", $receiver_type);
                $stmt2->execute();
            }

            return ["status" => true, "message_id" => $message_id];
        } catch (Exception $e) {
            return ["status" => false, "error" => $e->getMessage()];
        }
    }

    public function getMessages($user_id, $user_type)
    {
        try {
            // 1️⃣ Fetch inbox messages (unicast or broadcast)
            $query = "
            SELECT m.*, r.is_read, r.read_at
            FROM " . $this->dgf_messages_table . " m
            LEFT JOIN " . $this->dgf_messages_reads_table . " r 
                ON m.id = r.message_id 
                AND r.receiver_id = :user_id 
                AND r.receiver_type = :user_type
            WHERE 
                (m.delivery_type = 'broadcast')
                OR (m.delivery_type = 'unicast' AND (m.receiver_id = :user_id AND m.receiver_type = :user_type))
                OR (m.delivery_type = 'unicast' AND m.sender_id = :user_id AND m.sender_type = :user_type)
            ORDER BY m.created_at DESC
        ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":user_id", $user_id);
            $stmt->bindValue(":user_type", $user_type);
            $stmt->execute();

            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $inbox = [];
            $sent = [];

            foreach ($messages as $msg) {
                if ($msg['sender_id'] == $user_id && $msg['sender_type'] == $user_type) {
                    $sent[] = $msg;
                } else {
                    $inbox[] = $msg;
                }
            }

            return [
                "status" => true,
                "inbox" => $inbox,
                "sent" => $sent,
                "count_inbox" => count($inbox),
                "count_sent" => count($sent),
                "all" => $messages,
                "count_all" => count($messages)
            ];
        } catch (Exception $e) {
            return ["status" => false, "error" => $e->getMessage()];
        }
    }
    // MAIL UNICAST & BROADCAST




}


//
