document.addEventListener('DOMContentLoaded', () => {
    const fortuneBtn = document.getElementById('fortuneBtn');
    const fortuneResult = document.getElementById('fortuneResult');

    fortuneBtn.addEventListener('click', () => {
        const fortunes: string[] = [
            '今天是個好運氣的一天！',
            '遇到困難時，要保持冷靜。',
            '您的未來充滿了驚喜和惡作劇。',
            '繼續努力，成功將屬於您。',
            '您可能會遇到一個有趣的陌生人。',
            '保持開放，您的人生將充滿好運。',
            '抓住每個機會，它們會帶您走向成功。',
            '您的努力將會得到回報。'
        ];

        const randomIndex = Math.floor(Math.random() * fortunes.length);
        fortuneResult.textContent = fortunes[randomIndex];
        
        // Reset the animation
        fortuneResult.style.animation = 'none';
        setTimeout(() => {
            fortuneResult.style.animation = '';
        }, 10);
    });
});
