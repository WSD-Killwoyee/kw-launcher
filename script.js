document.addEventListener('DOMContentLoaded', (event) => {
    const windows = document.querySelectorAll('.window');

    windows.forEach(window => {
        const header = window.querySelector('.window-header');
        const content = window.querySelector('.window-content');
        const url = window.dataset.url;

        // Load content into the window
        if (url) {
            fetch(url)
                .then(response => response.text())
                .then(data => content.innerHTML = data)
                .catch(error => console.error('Fetch error:', error));
        }

        // Initialize zIndex
        window.style.zIndex = 1;

        // Make the window draggable
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - window.offsetLeft;
            offsetY = e.clientY - window.offsetTop;
            window.style.zIndex = parseInt(window.style.zIndex || 0) + 1; // Bring window to front
            e.preventDefault(); // Prevent text selection
        });

        const handleMouseMove = (e) => {
            if (isDragging) {
                window.style.left = (e.clientX - offsetX) + 'px';
                window.style.top = (e.clientY - offsetY) + 'px';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Optionally remove event listeners when window is removed
        window.addEventListener('remove', () => {
            document.removeEventListener('mousemove', handleMouseMove);
        });

        // Resize functionality can be added here
    });
});
