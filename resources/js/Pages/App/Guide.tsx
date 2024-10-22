import React from 'react';

const Guide: React.FC = () => {
  return (

    <div className='w-100 h-100 ' style={{ margin: '0', padding: '0' }}>


    <div className="container my-5">
      <a href="/" className='text-primary mr-4 d-flex gap-2'>
      
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="#0d6efd"></path> </g></svg>
      
      Kembali</a>
      <h1 className="text-center mb-4 fs-2">Panduan Penggunaan Tes Speaking IELTS</h1>

      <div className="row">
        {/* Card 1 - Masukkan Nama dan Mulai Tes */}
        <div className="col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title font-bold">1. Masukkan Nama dan Mulai Tes Speaking</h5>
              <p className="card-text">
                Langkah pertama dalam menggunakan aplikasi web IELTS ini adalah memasukkan nama Anda. Hal ini penting karena nama yang Anda masukkan akan digunakan sebagai identitas selama tes berlangsung dan juga untuk pelaporan hasil tes. Setelah memastikan nama Anda benar, Anda dapat memulai tes dengan mengklik tombol <strong>"Start Speaking Test"</strong>. Tombol ini akan memulai seluruh proses tes speaking. Pastikan koneksi internet stabil, dan perangkat mikrofon Anda berfungsi dengan baik sebelum memulai. Tes ini akan menilai kemampuan Anda berbicara dalam bahasa Inggris berdasarkan pertanyaan yang akan muncul. Jangan lupa untuk bersiap-siap mendengarkan soal sebelum berbicara.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Dengarkan Soal dengan Seksama */}
        <div className="col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title font-bold">2. Dengarkan Soal dengan Seksama</h5>
              <p className="card-text">
                Setelah memulai tes, aplikasi akan menyebutkan pertanyaan secara lisan. Pada tahap ini, sangat penting bagi Anda untuk mendengarkan setiap pertanyaan dengan seksama. Jangan terburu-buru menjawab sebelum Anda benar-benar memahami pertanyaannya. Ini adalah kunci untuk memberikan jawaban yang relevan dan terstruktur dengan baik. Pastikan untuk fokus pada intonasi dan pemilihan kata yang digunakan dalam pertanyaan. Jika Anda kehilangan satu bagian penting dari pertanyaan, jawabannya mungkin menjadi kurang tepat. Usahakan berada di tempat yang tenang tanpa gangguan eksternal agar Anda bisa fokus sepenuhnya saat mendengarkan pertanyaan.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 - Mulai Rekaman Jawaban */}
        <div className="col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title font-bold">3. Mulai Rekaman Jawaban</h5>
              <p className="card-text">
                Ketika Anda sudah siap menjawab, langkah berikutnya adalah memulai rekaman. Klik tombol <strong>"Start"</strong> untuk memulai proses perekaman jawaban. Aplikasi ini akan memberi Anda batas waktu selama 90 detik untuk setiap pertanyaan. Dalam durasi tersebut, cobalah memberikan jawaban yang sejelas mungkin dan hindari berbicara terlalu cepat atau terlalu lambat. Gunakan waktu sebaik-baiknya untuk menyampaikan gagasan Anda secara terstruktur. Selain itu, pastikan suara Anda terdengar jelas, dan jangan lupa untuk menatap ke depan atau berbicara dengan artikulasi yang baik agar rekaman dapat menangkap seluruh kata-kata yang Anda ucapkan.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 - Berikan Jeda dan Pelafalan yang Tepat */}
        <div className="col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title font-bold">4. Berikan Jeda dan Pelafalan yang Tepat</h5>
              <p className="card-text">
                Dalam berbicara, sangat penting untuk memberikan jeda yang cukup di antara kalimat. Jangan terburu-buru mengucapkan seluruh jawaban sekaligus. Jeda yang cukup tidak hanya akan membuat jawaban Anda terdengar lebih alami, tetapi juga membantu aplikasi dalam menganalisis pelafalan Anda dengan lebih akurat. Setiap kalimat yang diucapkan dengan benar akan memberi poin lebih dalam penilaian. Pelafalan kata-kata yang jelas dan tepat akan memastikan jawaban Anda terdengar profesional. Ingatlah, kecepatan yang tepat dan pengucapan yang benar akan meningkatkan hasil penilaian speaking Anda secara signifikan.
              </p>
            </div>
          </div>
        </div>

        {/* Card 5 - Menghentikan Rekaman */}
        <div className="col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title font-bold">5. Menghentikan Rekaman</h5>
              <p className="card-text">
                Jika Anda merasa sudah selesai menjawab sebelum waktu 90 detik habis, Anda bisa menghentikan rekaman secara manual dengan mengklik tombol <strong>"Stop"</strong>. Ini akan mengakhiri perekaman untuk pertanyaan tersebut, dan Anda akan siap untuk melanjutkan ke pertanyaan berikutnya. Namun, pastikan bahwa jawaban Anda sudah lengkap dan jelas sebelum menghentikan rekaman. Menghentikan rekaman terlalu cepat bisa menyebabkan Anda kehilangan kesempatan untuk memberikan informasi tambahan yang mungkin relevan. Oleh karena itu, gunakan waktu dengan bijak dan jangan terlalu cepat menekan tombol stop kecuali Anda yakin telah menjawab pertanyaan dengan sempurna.
              </p>
            </div>
          </div>
        </div>

        {/* Card 6 - Lanjut ke Pertanyaan Berikutnya */}
        <div className="col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title font-bold">6. Lanjut ke Pertanyaan Berikutnya</h5>
              <p className="card-text">
                Setelah selesai dengan satu soal, aplikasi akan secara otomatis menampilkan pertanyaan berikutnya. Proses ini akan terus berlanjut hingga semua pertanyaan selesai dijawab. Setiap kali pertanyaan baru muncul, ulangi langkah-langkah yang telah dijelaskan di poin 3, yaitu mendengarkan soal dengan seksama, memulai rekaman, dan memberikan jawaban yang jelas dan terstruktur. Dengan setiap pertanyaan, cobalah untuk semakin nyaman berbicara dalam bahasa Inggris dan menjaga alur jawaban tetap relevan dengan topik yang diberikan. Semakin lancar Anda berbicara, semakin baik hasil akhir yang akan Anda peroleh dalam penilaian speaking.
              </p>
            </div>
          </div>
        </div>

        {/* Card 7 - Menyelesaikan Tes dan Mendapatkan Hasil */}
        <div className="col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title font-bold">7. Menyelesaikan Tes dan Mendapatkan Hasil</h5>
              <p className="card-text">
                Setelah semua pertanyaan telah dijawab, atau jika Anda merasa sudah cukup dan ingin mengakhiri tes, klik tombol <strong>"Get the Result"</strong>. Aplikasi akan mulai menghitung jawaban Anda berdasarkan berbagai parameter, termasuk kejelasan, struktur, pelafalan, dan lain-lain. Setelah analisis selesai, hasil tes speaking Anda akan ditampilkan. Hasil ini bisa Anda gunakan sebagai gambaran kemampuan speaking Anda dalam bahasa Inggris, dan menjadi bahan evaluasi untuk perbaikan lebih lanjut. Jika hasil belum sesuai harapan, Anda bisa melakukan tes ulang dan mencoba untuk meningkatkan kemampuan berbicara Anda dengan latihan lebih banyak.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    </div>


  );
};

export default Guide;
