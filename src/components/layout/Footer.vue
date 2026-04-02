<template>
  <footer class="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div class="col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-[#008542] rounded-lg flex items-center justify-center text-white font-bold text-lg">U</div>
            <span class="font-extrabold text-xl text-slate-800">U-Mart.</span>
          </div>
          <p class="text-slate-500 text-sm max-w-sm leading-relaxed">Platform Ekosistem Layanan Jasa Tutor Privat Mahasiswa Terintegrasi BPUB BLU Universitas Negeri Medan.</p>
        </div>
        <div>
          <h5 class="font-bold text-slate-800 mb-4">Layanan</h5>
          <ul class="space-y-2 text-sm text-slate-500">
            <li><router-link to="/shop" class="hover:text-[#008542]">Cari Tutor</router-link></li>
            <li><a href="#" class="hover:text-[#008542]">Validasi Sertifikat</a></li>
          </ul>
        </div>
        <div>
          <h5 class="font-bold text-slate-800 mb-4">Bantuan</h5>
          <ul class="space-y-2 text-sm text-slate-500">
            <li><a href="#" class="hover:text-[#008542]">FAQ & Panduan</a></li>
            <li><a href="#" class="hover:text-[#008542]">Hubungi Kami</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2026 Tim PKM-PI U-Mart UNIMED. Hak Cipta Dilindungi.</p>
        <p>Vue 3 Production Build</p>
      </div>
    </div>
  </footer>
</template>