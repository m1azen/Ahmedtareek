<?php
session_start();

// التحقق مما إذا كان المستخدم مسجل دخول
$logged_in = isset($_SESSION['user']);

if ($logged_in) {
    echo '<button onclick="window.location.href=\'Myacaunt.html\'">حسابي</button>';
    echo '<button onclick="window.location.href=\'learn.html\'">منتدى الطلاب</button>';
    echo '<button onclick="window.location.href=\'listcours.html\'">اشتراكاتي</button>';
    echo '<button onclick="window.location.href=\'logout.php\'">تسجيل خروج</button>';
} else {
    echo '<button onclick="window.location.href=\'login.html\'">تسجيل دخول</button>';
    echo '<button onclick="window.location.href=\'createanaccount.html\'">إنشاء حساب</button>';
}
?>
