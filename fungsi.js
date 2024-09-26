const qrReader = document.getElementById('qr-reader');
    const startButton = document.getElementById('startButton');
    const resultBody = document.getElementById('result-body');
    let scanCount = 1;

    const html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-reader', { fps: 10, qrbox: 250 }
    );



    // Fungsi untuk meminta izin lokasi
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert("Geolocation tidak didukung oleh browser ini.");
      }
    }

    // Fungsi untuk menampilkan posisi saat ini
    function showPosition(position) {
      window.scanLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    }

    // Fungsi untuk menangani kesalahan saat mendapatkan lokasi
    function showError(error) {
      console.error("Error getting location:", error.message);
      alert("Terjadi kesalahan saat mendapatkan lokasi. Pastikan GPS Anda aktif.");
    }

    function startScanning() {
      getLocation(); // Meminta izin lokasi sebelum memulai pemindaian
      qrReader.style.display = 'block';
      startButton.style.display = 'none';
      html5QrcodeScanner.render(onScanSuccess);
    }




    function onScanSuccess(decodedText, decodedResult) {
      const newRow = document.createElement('tr');
      newRow.innerHTML = 
        <td>${scanCount}</td>
        <td><img src="" alt="Preview Photo ${scanCount}" id="photo-preview${scanCount}"></td>
        <td>${decodedText}</td>
        <td>${new Date().toLocaleString()}</td>
        <td>${window.scanLocation ? ${window.scanLocation.lat}, ${window.scanLocation.lng} : '-'}</td>
        <td>
         
<video id="video_${scanCount}" width="320" height="240"></video>
<canvas id="canvas_${scanCount}" style="display: none;"></canvas>
<button id="captureButton_${scanCount}">Ambil Gambar</button>
<img id="imgDisplay_${scanCount}">
       </td>

      ;
      resultBody.appendChild(newRow);

      takePhoto(scanCount);
      html5QrcodeScanner.pause();
      scanCount++;
      startButton.style.display = 'block'; // Tampilkan tombol mulai lagi
    }





    function takePhoto(index) {
      const video = document.querySelector('video');
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photo = canvas.toDataURL('image/jpeg');

      // Opsional: Tambahkan data lokasi ke metadata gambar (memerlukan dukungan library)
      // Explore libraries seperti EXIF.js untuk menyematkan data lokasi di dalam gambar itu sendiri.

      document.getElementById('photo-preview' + index).src = photo;
    }



    startButton.addEventListener('click', startScanning);
