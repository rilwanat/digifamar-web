<?php
require __DIR__ . '/vendor/autoload.php'; // PHPMailer autoload

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/');
$dotenv->load();

/**
 * Generate a consistent email template
 */
function buildEmailTemplate($username, $subject, $message)
{
    return '
    <!DOCTYPE html>
    <html>
    <head>
        <title>DiGiFaMaR</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; width: 90%; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; padding: 20px 0; background-color: #02006a; color: #ffffff; border-radius: 8px 8px 0 0; }
            .header h2 { margin: 0; font-size: 24px; }
            .content { padding: 20px; font-size: 16px; }
            .content p { margin: 15px 0; font-size: 16px; color: #333333; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #ffffff; border-radius: 8px 8px 0 0; background-color: #02006a; margin-top: 20px; }
            .footer a { color: #ffffff; margin: 0 5px; }
            .footer p { color: #ffffff;  }
            @media (max-width: 600px) {
                .container { width: 100%; margin: 10px; padding: 15px; }
                .header h2 { font-size: 20px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header"><h2>' . $subject . '</h2></div>
            <div class="content">
                <p>Dear ' . explode(" ", $username)[0] . ',</p>
                <p>' . $message . '</p>
            </div>
            <div class="footer">
                <a href="https://www.facebook.com/" target="_blank">Facebook</a>
                <a href="https://www.x.com/" target="_blank">X</a>
                <a href="https://www.instagram.com/" target="_blank">Instagram</a>
                <a href="https://www.linkedin.com/in/" target="_blank">LinkedIn</a>
                <a href="https://www.tiktok.com/" target="_blank">TikTok</a>
                <a href="https://youtube.com/" target="_blank">YouTube</a>

                <p>If you no longer wish to receive emails, <a href="https://d.com/unsubscribe">unsubscribe here</a>.</p>

                <p>&copy; 2026 DiGiFaMaR. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>';
}

/**
 * Function 1: Send email using PHP's native mail()
 */
function sendMailToUser($username, $email, $subject, $message)
{
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "From: DiGiFaMaR <no-reply@d.com>\r\n";
    $headers .= "X-Auto-Response-Suppress: All\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";

    $emailBody = buildEmailTemplate($username, $subject, $message);

    $mailSent = mail($email, $subject, $emailBody, $headers);
    return $mailSent ? true : false;
}

/**
 * Function 2: Send email using PHPMailer via SMTP
 */
function sendMailSMTP($username, $toEmail, $subject, $message)
{
    // error_log("SMTP Host: " . $_ENV['SMTP_HOST']);
    // error_log("SMTP User: " . $_ENV['SMTP_USER']);
    // error_log("SMTP Pass: " . $_ENV['SMTP_PASS']);
    // error_log("SMTP Port: " . $_ENV['SMTP_PORT']);

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER'];
        $mail->Password   = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $_ENV['SMTP_PORT'];

        $mail->setFrom($_ENV['SMTP_USER'], 'DiGiFaMaR');
        $mail->addAddress($toEmail);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = buildEmailTemplate($username, $subject, $message);

        // Plain-text fallback
        $mail->AltBody = "Dear " . explode(" ", $username)[0] . ",\n\n" . $message . "\n\n-- DiGiFaMaR";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo);
        return false;
    }
}

/**
 * Wrapper: Try mail() first, fallback to SMTP
 */
// function sendMail($username, $email, $subject, $message)
// {
//     if (sendMailToUser($username, $email, $subject, $message)) {
//         return true;
//     } else {
//         return sendMailSMTP($username, $email, $subject, $message);
//     }
// }
