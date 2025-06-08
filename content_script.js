(async function autoRateStudents() {
  if (!confirm('Bạn có chắc chắn muốn tự động phân loại:\n• 60% sinh viên đầu: "Hoàn thành xuất sắc nhiệm vụ"\n• 40% sinh viên còn lại: "Hoàn thành tốt nhiệm vụ"?')) {
    console.log('❌ Đã hủy thao tác tự động.');
    return;
  }

  console.log('🚀 Bắt đầu quá trình tự động xếp loại...');
  const ratingSelects = document.querySelectorAll('select[name="IdDanhGia"]');
  console.log(`📊 Tìm thấy ${ratingSelects.length} sinh viên cần đánh giá`);
  if (ratingSelects.length === 0) return;

  const delay = ms => new Promise(r => setTimeout(r, ms));
  const isInViewport = el => {
    const r = el.getBoundingClientRect();
    return r.top >= 0 && r.left >= 0 && r.bottom <= window.innerHeight && r.right <= window.innerWidth;
  };
  const excellentCount = Math.ceil(ratingSelects.length * 0.6);
  console.log(`📊 Xuất sắc: ${excellentCount}, Tốt: ${ratingSelects.length - excellentCount}`);

  for (let i = 0; i < ratingSelects.length; i++) {
    const sel = ratingSelects[i];
    const isExc = i < excellentCount;
    sel.value = isExc ? '4' : '6';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    sel.dispatchEvent(new Event('input', { bubbles: true }));
    if (!isInViewport(sel)) sel.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    console.log(`✅ ${isExc ? 'Xuất sắc' : 'Tốt'} - SV ${i+1}`);
    await delay(100);
  }

  await delay(500);
  const saveBtn = document.querySelector('button.btn.btn-primary i.fa-save');
  if (saveBtn) {
    const btn = saveBtn.closest('button');
    btn.scrollIntoView(); await delay(200); btn.click();
    console.log('💾 Đã lưu!');
    await delay(800);
    const sendIcon = document.querySelector('button.btn.btn-info i.fa-send');
    if (sendIcon) {
      const sb = sendIcon.closest('button');
      sb.scrollIntoView(); await delay(200); sb.click();
      console.log('📤 Đã gửi! 🎊 HOÀN THÀNH!');
    } else console.warn('⚠️ Không tìm thấy nút Gửi!');
  } else console.warn('⚠️ Không tìm thấy nút Lưu!');
})();
