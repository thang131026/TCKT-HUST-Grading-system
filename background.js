chrome.action.onClicked.addListener(async (tab) => {
  const url = tab.url || '';
  const target = 'https://quanlydoanvien.doanthanhnien.vn/nghiep-vu-doan/danh-gia-doan-vien';
  if (url.startsWith(target)) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content_script.js']
      });
    } catch (e) {
      console.error('Failed to inject script:', e);
    }
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => alert('Vui lòng mở trang đánh giá đoàn viên trước khi dùng tiện ích.')
    });
  }
});
