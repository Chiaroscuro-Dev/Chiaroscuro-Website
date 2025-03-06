// Basic skill bar animation on window load
window.addEventListener('load', () => {
  const skillBarFills = document.querySelectorAll('.skill-bar-fill');

  skillBarFills.forEach(fill => {
    // Read the desired width from data-fill attribute
    const finalWidth = fill.getAttribute('data-fill');
    fill.style.width = finalWidth;
  });
});