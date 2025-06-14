document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarButton');
    const userIcon = document.getElementById('userIcon');
    const sidebarContent = document.getElementById('sidebarContent');
    const bannerButtonsContainer = document.getElementById('bannerButtons');

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // =====================================
    // ✅ Dark Mode Toggle Functionality
    // =====================================

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggle.checked = (savedTheme === 'dark-mode');
    } else {
        // Default to light mode if no preference is saved
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }

    // Theme toggle functionality
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // =====================================
    // ✅ Dummy User Login State (Replace with actual backend integration)
    // =====================================

    // Placeholder function for user login state.
    function isUserLoggedIn() {
        return localStorage.getItem('loggedIn') === 'true';
    }

    // Placeholder function to get user name.
    function getUserName() {
        return localStorage.getItem('userName') || "زائر";
    }

    // Dummy login/logout functions for testing
    function simulateLogin() {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', 'أحمد'); // Example name
        console.log('User logged in (simulated)');
        updateUI();
    }

    function simulateLogout() {
        localStorage.setItem('loggedIn', 'false');
        localStorage.removeItem('userName');
        console.log('User logged out (simulated)');
        updateUI();
    }

    // =====================================
    // ✅ Render Sidebar Content based on Login State
    // =====================================

    function renderSidebarContent() {
        sidebarContent.innerHTML = ''; // Clear existing content

        // Always show Home button
        sidebarContent.innerHTML += `
            <button class="sidebar-button"><i class="fas fa-home"></i> الصفحة الرئيسية</button>
        `;

        if (isUserLoggedIn()) {
            const userName = getUserName();
            sidebarContent.innerHTML += `
                <div class="sidebar-user-info">
                    <span>أهلاً ${userName}</span>
                </div>
                <button class="sidebar-button"><i class="fas fa-users"></i> منتدى الطلبة</button>
                <button class="sidebar-button"><i class="fas fa-user-circle"></i> حسابي</button>
                <button class="sidebar-button"><i class="fas fa-book-open"></i> كورساتي</button>
                <button class="sidebar-button" id="logoutButton"><i class="fas fa-sign-out-alt"></i> تسجيل خروج</button>
            `;
            document.getElementById('logoutButton').addEventListener('click', () => {
                simulateLogout();
                sidebar.classList.remove('show');
            });
        } else {
            sidebarContent.innerHTML += `
                <button class="sidebar-button" id="registerButton"><i class="fas fa-user-plus"></i> تسجيل جديد</button>
                <button class="sidebar-button" id="loginButton"><i class="fas fa-sign-in-alt"></i> تسجيل دخول</button>
            `;
            document.getElementById('registerButton').addEventListener('click', () => {
                alert('سيتم توجيهك لصفحة التسجيل!');
                sidebar.classList.remove('show');
            });
            document.getElementById('loginButton').addEventListener('click', () => {
                simulateLogin();
                sidebar.classList.remove('show');
            });
        }
    }

    // =====================================
    // ✅ Render Banner Buttons based on Login State
    // =====================================

    function renderBannerButtons() {
        bannerButtonsContainer.innerHTML = '';
        if (isUserLoggedIn()) {
            bannerButtonsContainer.innerHTML += `
                <button onclick="window.location.href='my_subscriptions.html'">اشتراكاتي</button>
            `;
        } else {
            bannerButtonsContainer.innerHTML += `
                <button onclick="window.location.href='join_us.html'">انضم إلينا</button>
            `;
        }
    }

    function updateUI() {
        renderSidebarContent();
        renderBannerButtons();
    }

    // =====================================
    // ✅ Sidebar Toggling
    // =====================================

    userIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        sidebar.classList.toggle('show');
        if (sidebar.classList.contains('show')) {
            updateUI();
        }
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('show');
    });

    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !userIcon.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });

    sidebar.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // =====================================
    // ✅ Animations on Scroll (Intersection Observer)
    // =====================================

    const animateElements = document.querySelectorAll('.feature-box, .chem-text, .chem-img, .card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Initial UI update on page load
    updateUI();
});