document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle for Mobile
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('.main-content');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Modal/Tab Logic for Dashboard
    const navItems = document.querySelectorAll('.dashboard-nav-item');
    const contentPanels = document.querySelectorAll('.dashboard-panel');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const panelId = item.getAttribute('data-panel');

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            contentPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === panelId) {
                    panel.classList.add('active');
                }
            });

            // Close sidebar on mobile after selection
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Mock Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const value = bar.getAttribute('aria-valuenow');
        setTimeout(() => {
            bar.style.width = value + '%';
        }, 500);
    });

    // Course Video Play Transition
    const videoThumb = document.querySelector('.video-thumbnail');
    if (videoThumb) {
        videoThumb.addEventListener('click', () => {
            videoThumb.innerHTML = `<div class="ratio ratio-16x9 h-100 rounded-4 overflow-hidden shadow-lg animate-on-scroll">
                 <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" allowfullscreen></iframe>
             </div>`;
        });
    }
});
