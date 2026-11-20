/* =========================
   DATA SISWA
========================= */

// Ganti nama-nama contoh dengan nama siswa kelas XIF.

const students = [
    "Ajeng Kusniawati",
    "Alysia Dwi Nova",
    "Andi Putra Pratama",
    "Dania Najwa Labibah",
    "Elvin Azhizakia",
    "Erdian Ramadhan Satria Wibowo",
    "Febry Hermawan",
    "Feby Alisa Maulina" ,
    "Gledys Safira Putri Maharani",
    "Haniyah Shiba Azzahra" ,
    "Hesti Anjarwati" ,
    "Isniati" ,
    "Keisha Callysta Azzahra" ,
    "Khilma Auliya Putri" ,
    "M. Akbar Maulana Hafidz" ,
    "Marcello Augustinus Widianto" ,
    "Mohammad Johar Arifin" ,
    "Muchamad Abdul Faiz" ,
    "Muhammad Devin Andriano" ,
    "Muhammad Anang Eka Rahaja" ,
    "Muhammad Riski Saputra" ,
    "Muhammad tristan Huga" ,
    "Nashua Putri Sumarno" ,
    "Olifia Okta Fiona" ,
    "Rafa Aldi Saputra" ,
    "Raja Ga;ih Sakti Permadi" ,
    "Rama Abdillah" ,
    "Regita Kasih Widyanata" ,
    "Rohisa Aunika" ,
    "Sania Septia Fitri" ,
    "Sena Muhibbudin Assalafi" ,
    "Senja Indah Parawansa" ,
    "Uswatun Khasanah" ,
    "Vega Sena Pratama' ,
    "Zahra Dwi Nur Islami" ,
    "Zaskiya Rahma Wati" 
  ];


/* =========================
   STORAGE
========================= */

const STORAGE_KEY = "presensi_xif_data";

function getAttendance() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveAttendance(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


/* =========================
   DATE
========================= */

function getToday() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function displayDate() {
    const dateElement = document.getElementById("current-date");

    const today = new Date();

    dateElement.textContent = today.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* =========================
   STUDENT DROPDOWN
========================= */

function loadStudents() {
    const select = document.getElementById("student-name");

    students.forEach((student) => {
        const option = document.createElement("option");

        option.value = student;
        option.textContent = student;

        select.appendChild(option);
    });

    document.getElementById("total-siswa").textContent =
        students.length;

    document.getElementById("info-total").textContent =
        students.length + " Siswa";
}


/* =========================
   SUBMIT ATTENDANCE
========================= */

const attendanceForm = document.getElementById("attendance-form");

attendanceForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("student-name").value;
    const status = document.getElementById("attendance-status").value;
    const note = document.getElementById("attendance-note").value.trim();

    const message = document.getElementById("attendance-message");

    if (!name) {
        message.textContent = "Silakan pilih nama terlebih dahulu.";
        message.style.color = "red";
        return;
    }

    const attendanceData = getAttendance();
    const today = getToday();

    // Periksa apakah siswa sudah melakukan presensi hari ini.
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

        // Perbarui presensi sebelumnya.
        attendanceData[existingIndex] = newRecord;

        message.textContent =
            "Presensi berhasil diperbarui!";

    } else {

        attendanceData.push(newRecord);

        message.textContent =
            "Presensi berhasil dikirim!";

    }

    message.style.color = "#216b43";

    saveAttendance(attendanceData);

    attendanceForm.reset();

    updateStatistics();

});


/* =========================
   UPDATE STATISTICS
========================= */

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
        item.status === "Izin" || item.status === "Sakit"
    ).length;

    const totalAlpa = todayData.filter(item =>
        item.status === "Alpa"
    ).length;

    document.getElementById("total-hadir").textContent =
        totalHadir;

    document.getElementById("total-izin").textContent =
        totalIzin;

    document.getElementById("total-alpa").textContent =
        totalAlpa;

    document.getElementById("total-siswa").textContent =
        students.length;

    document.getElementById("info-total").textContent =
        students.length + " Siswa";
}


/* =========================
   NAVIGATION ACTIVE STATE
========================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", function() {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


/* =========================
   INITIALIZE WEBSITE
========================= */

displayDate();

loadStudents();

updateStatistics();
