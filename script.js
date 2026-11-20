/* =================================
   PRESENSI XIF
   DATA 36 SISWA
================================= */

// DAFTAR NAMA SISWA

const students = [
    "Ajeng Kusniawati",
    "Alysia Dwi Nova",
    "Andi Putra Pratama",
    "Dania Najwa Labibah",
    "Elvin Azhizakia",
    "Erdian Ramdhan Satrio Wibowo",
    "Febry Hermawan",
    "Feby Alisa Maulina",
    "Gledys Safira Putri Maharani",
    "Haniyah Shiba Azzahra",
    "Hesti Anjarwati",
    "Isniati",
    "Keisha callysta Azzahra",
    "Khilma Auliya Putri",
    "M. Akbar Maulana Hafidz",
    "Marcello Agustinus Widianto",
    "Mohammad Johar Arifin",
    "Muchamad Abdul Faiz",
    "Muhamad Devin Andriano",
    "Muhammad Anang Eka Raharja",
    "Muhammad Riski Saputra",
    "Muhammad Tristan Huga",
    "Nashua Putri Sumarno",
    "Olifia Okta Fiona",
    "Rafa Aldi Saputra",
    "Raja Galih Sakti Permadi",
    "Rama Abdillah",
    "Regita Kasih Widayanta",
    "Rohisa Aunika",
    "Sania Septia Fitri",
    "Sena Muhibbuddin Assalafi",
    "Senja Indah Parawansa",
    "Uswatun khasanah",
    "Vega Senapratama",
    "Zahra Dwi Nur Islami",
    "Zaskiya Rahma Wati"
];


/* =================================
   PENYIMPANAN DATA
================================= */

const STORAGE_KEY = "presensi_xif_data";

function getAttendance() {
    try {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || [];
    } catch (error) {
        return [];
    }
}

function saveAttendance(data) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =================================
   TANGGAL
================================= */

function getToday() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function displayDate() {
    const dateElement =
        document.getElementById("current-date");

    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}


/* =================================
   MEMASUKKAN NAMA SISWA
================================= */

function loadStudents() {

    const select =
        document.getElementById("student-name");

    // Menghapus pilihan lama selain placeholder
    select.innerHTML =
        '<option value="">Pilih nama siswa</option>';

    students.forEach((student) => {

        const option =
            document.createElement("option");

        option.value = student;
        option.textContent = student;

        select.appendChild(option);

    });

    // Menampilkan total siswa
    document.getElementById("total-siswa")
        .textContent = students.length;

    document.getElementById("info-total")
        .textContent = students.length + " Siswa";
}


/* =================================
   MENGIRIM PRESENSI
================================= */

const attendanceForm =
    document.getElementById("attendance-form");

attendanceForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("student-name").value;

    const status =
        document.getElementById("attendance-status").value;

    const note =
        document.getElementById("attendance-note").value.trim();

    const message =
        document.getElementById("attendance-message");

    if (!name) {

        message.textContent =
            "Silakan pilih nama terlebih dahulu.";

        message.style.color = "red";
        return;

    }

    const attendanceData = getAttendance();
    const today = getToday();

    // Memeriksa presensi sebelumnya
    const existingIndex = attendanceData.findIndex(item =>
        item.name === name && item.date === today
    );

    const newRecord = {

        name: name,
        status: status,
        note: note,
        date: today,

        time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        })

    };

    if (existingIndex !== -1) {

        // Memperbarui presensi yang sudah ada
        attendanceData[existingIndex] = newRecord;

        message.textContent =
            "Presensi berhasil diperbarui!";

    } else {

        // Menambahkan presensi baru
        attendanceData.push(newRecord);

        message.textContent =
            "Presensi berhasil dikirim!";

    }

    message.style.color = "#216b43";

    saveAttendance(attendanceData);

    attendanceForm.reset();

    updateStatistics();

});


/* =================================
   MENGHITUNG STATISTIK
================================= */

function updateStatistics() {

    const attendanceData = getAttendance();

    const today = getToday();

    const todayData = attendanceData.filter(item =>
        item.date === today
    );

    const totalHadir = todayData.filter(item =>
        item.status === "Hadir"
    ).length;

    const totalIzin = todayData.filter(item =>
        item.status === "Izin" ||
        item.status === "Sakit"
    ).length;

    const totalAlpa = todayData.filter(item =>
        item.status === "Alpa"
    ).length;

    document.getElementById("total-hadir")
        .textContent = totalHadir;

    document.getElementById("total-izin")
        .textContent = totalIzin;

    document.getElementById("total-alpa")
        .textContent = totalAlpa;

    document.getElementById("total-siswa")
        .textContent = students.length;

    document.getElementById("info-total")
        .textContent = students.length + " Siswa";
}


/* =================================
   NAVIGASI MENU
================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", function() {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


/* =================================
   MENJALANKAN WEBSITE
================================= */

displayDate();

loadStudents();

updateStatistics();


/* =================================
   INFORMASI TOTAL SISWA
================================= */

console.log("Presensi XIF berhasil dijalankan.");

console.log("Total siswa:", students.length);
