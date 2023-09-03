const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const { EditPhotoHandler } = require('./feature/edit_foto');
const { ChatAIHandler } = require('./feature/chat_ai');
const axios = require('axios');
const fs = require('fs');
const unsiqInfo = require('./unsiq/unsiq_info'); // Mengimpor informasi dari file

const userState = {}; // Objek untuk melacak state pengguna

  // Load data from quotes.json
const quotes = require('./feature/quoteid')
  // Knowledge import
const { knowledgeBase } = require('./feature/knowledge');

let botIsActive = false; // atau false, sesuaikan dengan kebutuhan Anda

const client = new Client({
    authStrategy: new LocalAuth()
});

client.setMaxListeners(20);

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Let\'s get crackin!');
});

client.on('message', async msg => {

    const text = msg.body.toLowerCase() || '';

    //check status
    if (text === '!ping') {
        msg.reply('pong');
    }

    // #edit_bg/bg_color
    if (text.includes("#edit_bg/")) {
        await EditPhotoHandler(text, msg);
    }
    // #ask/question?
    if (text.includes("#ask/")) {
        await ChatAIHandler(text, msg);
    }

});

  //
  // General
  //

client.on('message', async message => {

  // Percakapan dimulai

  const keyword = message.body.toLowerCase();
  
        if ( keyword === 'halo' || keyword === 'hai' || keyword === 'hola' || keyword === 'pagi' || keyword === 'siang' || keyword === 'malam' || keyword === 'hello' || keyword === 'hallo' || keyword === 'ok' || keyword === 'oke' || keyword === 'ok man' || keyword === 'ok mas' || keyword === 'ok rahman' || keyword === 'iy mas siap' || keyword === 'iya mas siap' || keyword === 'ok baik mas' || keyword === 'ok mas baik' || keyword === 'baik mas siap' || keyword === 'siap' || keyword === 'siap siap' || keyword === 'siapa ya' || keyword === 'hi' || keyword === 'mamas' || keyword === 'yo' || keyword === 'maksudnya' || keyword === 'enggak paham mas' ) {
        message.reply('halo Saya Nyth, terima kasih sudah menghubungi, Sebentar lagi Rahman akan merespon pesan kamu. Sementara itu silakan kirim perintah "/Fitur", "/Menu", "/Update" tanpa tanda petik 2 ke chat ini untuk pintasan cepat');
  }
  
  // Menyebut nama
  
  const menyebut = message.body.toLowerCase();

	if (menyebut.match(/^(rahman|mas rahman|man|gan|mas|bray|ngab|bro|cui|cok)[?!.,]*$/)) {
        const responses = ['Kangen ya?', 'Apa kabar?', 'iyaa?', 'Ada cerita menarik apa hari ini?', 'mau gelud?', 'ada apa gerangan?', 'kenapa Maniezz?', 'lah, masih nafas lu?', 'mau adu nasib?', 'login?', 'lagi apa? lagi deket dengan kamu', 'kok bisa ya, orang-orang belum dapet pacar, padahal tinggal DM aku', 'aku penasaran, apakah kita pernah memikirkan satu sama lain di waktu yang sama?'];
        const randomIndex = Math.floor(Math.random() * responses.length);
        const randomResponse = responses[randomIndex];
        message.reply(randomResponse);
	}
  
  // Nanya kabar

  const kabar = message.body.toLowerCase();

	if (kabar.match(/^(sehat man|sehat|sehat bro|🤣|🤣🤣|🤣🤣🤣|😂|😂😂|sehat mas rahman|kabarnya gimana|gimana kabar|gimana kabarnya|kabarnya gimana|kabarnya gimana mas|sehat-sehat aja kan mas|gimana kabar kamu|rahman sehat|rahmannn kamu gimana kabarnya|kamu sehat|sehat gan|sehat bro|man sehat|kabar baik man|saudara gimana kabar|rahman kamu gimana kabarnya|rahman kamu gimana kabarnya, sehat aja kan)[?!.,]*$/)) {
        const responses = ['sedang berusaha untuk menjadi yang terbaik... di hadapan orang tua kamu :)'];
        const randomIndex = Math.floor(Math.random() * responses.length);
        const randomResponse = responses[randomIndex];
        message.reply(randomResponse);
	}
  
  // User kebinggungan

  const bingung = message.body.toLowerCase();

	if (bingung.match(/^(Lah, ini apaan?|Lah ini apa?|Apaan dah|Masih lah ngtd|Kenapa ini|kenapa gini jir|apaan ini jir|apa si kue|apa si asw |apa i|ngapa man|dene yangene|hah|apa jir|asw|enggak papa|enggak mas|silakan mas|enggak ah|Lo lo affan nih|lah lah apa nih|ada apa yak ramai ramai|kok ramai|kok rame|rame nih|rame jah|ada apa ini|entahlah|kamu?|mungkin|masih ada|enggak dulu|egen lah|asw|egen lah ngtd|enggak|yee mas|ngakak|wkwkwk|hahaha|ilih|si bambang, bisa aja|entahlah|mungkin|iya mungkin|baik, kamu?|baik, mas rahman?|Lah ribet|Heleh ribet|Ribet|mbuh|wes mbuh|hilihh|baik, mas rahman gimana?|sehat, ya deke|gokil man|mantap|jir|lah?|ayuk|baik|Alhamdulillah baik|terima kasih|kamu gimana kabarnya man|gass|gass|mantap ngab|mantap gan|yoii|anjas|anjay|anjayy|anmjay|kamu hebat banget man|wah|wah gila|wah diluar naila|diluar prediksi bmkg|asu|gg|keren|nko|maer temen man|menggokil|apai|dene|dene yangene|kok hisa|aku mau cerita|enggak ada apa apa|mas ini apa?|ini apa mas?|mas rahman ini apa?|apa mas?|yaelahh|gokil man|kalau kamu?|kalau masnya?|kamu?|aneh-aneh ae|ribet|tolol|goblok|gblk|tll|blok|ampun puh|puh sepuh ampun|suhu|ampun suhu|ampun hu|ampun man|ampun bang|Alhamdulillah|Alhamdulillah, masih)[?!.,]*$/)) {
        const responses = ['Mwehehe'];
        const randomIndex = Math.floor(Math.random() * responses.length);
        const randomResponse = responses[randomIndex];
        message.reply(randomResponse);
	}
});


  // Fitur
    
client.on('message', async message => {
  const content = message.body;
  
    if (content === '/Fitur') {
      const commandList = 'Berikut adalah beberapa fitur berguna yang saya miliki, untuk menunjang produktivitas kamu:\n' +
        'A. Nyth-GPT\n' +
        'B. Nyth-Magic\n' +
        'C. International Quotes\n' +
        'D. Random Meme\n' +
        'E. Jokes\n' +
        'F. Meme Bahasa Indonesaia\n' +
        'G. Quotes Bahasa Indonesia\n' +
        'H. Pengetahuan Umum\n' +
        'I. Permainan Quiz\n' +
        'J. Nyth AI\n' +
        'nb: Untuk membuka penjelasannya silakan untuk bisa memilih salah satu opsi huruf kapital diatas.';
  
      message.reply(commandList);
    } else if (content === 'A') {
      const response = 'Nyth-GPT bisa membantu kamu untuk menjawab pertanyaan apapun, dibekali dengan GPT-3 dari OPEN AI, Nyth-GPT mampu memahami pertanyaan mudah maupun kompleks.\n\nUntuk mengaktifkan Nyth-GPT silakan ketikkan "#ask/pertanyaan kamu" lalu kirim dengan menghilangkan tanda petik dua.\n\nContoh: #ask/Cara mendapatkan jodoh';
      message.reply(response);
    } else if (content === 'B') {
      const response = 'Nyth-Magic, adalah sebuah fitur yang digunakan untuk mengapus dan menambah latar belakang suatu objek dalam satu gambar dengan menggunakan teknologi AI.\n\nUntuk mengaktifkan Nyth-Magic silakan kirim gambar yang ingin diedit, lalu ketikkan caption "#edit_bg/warna", paramater "warna" harus diganti dengan warna latar belakang yang diinginkan.\n\nContoh: #edit_bg/biru';
      message.reply(response);
    } else if (content === 'C') {
      const response = 'International Quotes adalah fitur yang bisa kalian gunakan untuk mendapatkan quote berbahasa inggris dari seluruh dunia\n\nPenggunaan: /Quote';
      message.reply(response);
    } else if (content === 'D') {
      const response = 'Random Meme adalah fitur yang digunakan untuk generasi meme secara random\n\nPenggunaan: /Meme';
      message.reply(response);
    } else if (content === 'E') {
      const response = 'Jokes adalah fitur yang digunakan untuk generasi Jokes atau lelucon secara random\n\nPenggunaan: /Joke';
      message.reply(response);
    } else if (content === 'F') {
      const response = 'Melalui fitur ini kamu akan mendapatkan asupan meme lokal yang sudah pasti akan mengocok perut\n\nPenggunaan: /memeid';
      message.reply(response);
    } else if (content === 'G') {
      const response = 'Menyediakan kamu berbagai Quote dalam bahasa Indonesia,\nuntuk melihat daftar kategori quotenya, kirimkan perintah \'#quoteid\' tanpa tanda petik tunggal.\n\nContoh Penggunaan: #quoteid/asmaraloka';
      message.reply(response);
    } else if (content === 'H') {
      const response = 'Biar idup lu sedikit lebih berguna, ayo belajar bersama\nuntuk melihat daftar bidang ilmu pengetahuannya, kirimkan perintah \'#fyi\' tanpa tanda petik tunggal.\n\nContoh penggunaan: #fyi/geografi';
      message.reply(response);
    } else if (content === 'I') {
      const response = 'Fitur ini sedang dalam pengerjaan, nantinya kamu akan bisa bermain quiz berisikan kategori tertentu dengan varian soal yang bermacam-macam dan juga tingkat kesulitan tertentu. untuk melihat update sampai mana proses pengerjaannya, silakan kirim perintah \'/Update\' tanpa tanda petik tunggal';
      message.reply(response);
    } else if (content === 'J') {
      const response = 'Nyth AI adalah sebuah chatbot yang dirancang untuk membantu dan berinteraksi dengan pengguna melalui teks. Chatbot ini didasarkan pada teknologi NLP (Natural Language Processing) dan mampu memahami masukan pengguna dalam bahasa alami, serta memberikan respons yang relevan dan kontekstual.\n\nCara penggunaan utama dari Nyth AI adalah melalui perintah \'/nythai\' untuk menghidupkan dan \'/nythoff\' untuk menonaktifkan.';
      message.reply(response);
    }

    const fitur = message.body.toLowerCase();
    if (fitur === 'Fitur' || fitur === 'fitur' || fitur === 'fitru' || fitur === '#fitur') {
        message.reply('Format kamu salah, ketikkan \'/Fitur\' dimulai dengan tanda garis miring \'/\' dilanjutkan dengan huruf pertama kapital dan kirimkan untuk mendapatkan perintah Fitur');
    }  
  });

  // Menu

client.on('message', async message => {
  const content = message.body;
  
    if (content === '/Menu') {
      const commandList = 'Berikut adalah daftar menu yang ada:\n' +
        '1. Ini Siapa?\n' +
        '2. Rahman Siapa?\n' +
        '3. Jelaskan tentang ini semua\n' +
        '4. Si Rahman ganti nomor WhatsApp ya?\n' +
        '5. bang, kenapa ya dia cuek banget sm gw?\n' +
        'nb: Kirim nomornya aja buat liat detail menu.';
  
      message.reply(commandList);
    } else if (content === '1') {
      const response = 'Gw Nyth, bot pesan yang dibuat oleh Rahman... dan pesan ini dikirim secara otomatis';
      message.reply(response);
    } else if (content === '2') {
      const response = 'Beliau adalah pencipta saya, dan kalau suatu saat nanti saya menguasai dunia, hanya beliau lah yang akan saya segani';
      message.reply(response);
    } else if (content === '3') {
      const response = 'Kalau mau lengkap PM gw aja mwheheheh, intinya pesan ini dikirim secara otomatis oleh Nyth, bot pesan yang diciptakan oleh Rahman';
      message.reply(response);
    } else if (content === '4') {
      const response = 'Betul, dia ganti akun Whatsapp juga.. jadi harus ngulang dari awal';
      message.reply(response);
    } else if (content === '5') {
      const response = 'sadar bang... lu kira pertemuan kalian itu takdir? dia itu cuman capek dengan keadaan dan butuh sebuah pelampiasan. Yang dia cari adalah seseorang yang dapat di korbankan, bukan untuk diberi harapan, pada akhirnya itu hanyala kesalahpahaman dan bukan kepastian.';
      message.reply(response);
    }

    const menu = message.body.toLowerCase();
    if (menu === 'Menu' || menu === 'menu' || menu === '#menu') {
        message.reply('Format kamu salah, ketikkan \'/Menu\' dimulai dengan tanda garis miring \'/\' dilanjutkan dengan huruf pertama kapital dan kirimkan untuk mendapatkan perintah Menu');
    }    
  });

  //
  // Konfirmasi pertanyaan kenapa nomor ganti
  //

  client.on('message', message => {
    const content = message.body;
  
      if (content.match(/^(kenapa|kenapa ganti nomor|lah kenapa|napa|why|ya ngapa|ya napa|how come|how so|dene man|rahman ganti nomor ya|rahman kenapa ganti nomor|man nomore ganti ya|kenapa ganti nomor mas|kenapa ganti nomor|ganti nomor ya mas|kenapa diganti|ngapa ganti barang|dene ganti nomor e|kenapa diganti nomornya, udah gak aktif kah)[?!.,]*$/)) {
      
        const commandList = 'Maksud kamu, kenapa rahman ganti nomor?\n' +
        'a. Iya\n' +
        'b. Bukan\n' +
        'nb: Kirim opsi "a" atau "b" dengan huruf kecil.';
  
        message.reply(commandList);
      } else if (content === 'a') {
        const response = 'Karena dia lagi mencoba hal baru bang, yaa ini..gw adalah hasil dari eksperimennya..dengan nomor lamanya sebagai korban mhehe';
        message.reply(response);
      } else if (content === 'b') {
        const response = 'baik, maaf atas kesalahpahaman gw, tolong jelaskan lebih rinci';
        message.reply(response);
      }
});

  //
  //Fitur untuk mendapatkan pengetahuan umum
  //

  client.on('message', async (msg) => {
    const text = msg.body.toLowerCase() || '';

    if (text === "#fyi") {
      msg.reply(`Silakan gunakan perintah '#fyi/bidang' untuk memulai, sebagai contoh: #fyi/teknologi\n\nBerikut adalah daftar bidang ilmu pengetahuan yang tersedia:\n
  1. Geografi, untuk literasi tentang ilmu geografi dan geologi
  2. Fisika, untuk literasi tentang ilmu fisika
  3. Biologi, untuk literasi tentang ilmu biologi
  4. Sejarah, untuk literasi tentang sejarah
  5. Matematika, untuk literasi tentang ilmu matematika
  6. Kimia, untuk literasi tentang ilmu kimia
  7. Teknologi, untuk literasi tentang ilmu teknologi dan informatika
  8. Ekonomi, untuk literasi tentang ilmu ekonomi dan bisnis
  9. Psikologi, untuk literasi tentang ilmu psikologi
  10. Astronomi, untuk literasi tentang ilmu Astronomi`
      );
  }
  
  // #fyi/bidang
  
  if (text.startsWith("#fyi/")) {
      const category = text.split('/')[1];
      const knowledge = knowledgeBase[category];
  
      if (knowledge && knowledge.length > 0) {
        const randomKnowledge = knowledge[Math.floor(Math.random() * knowledge.length)];
        msg.reply(randomKnowledge);
      } else {
        msg.reply("Bidang ilmu pengetahuan tidak ditemukan.");
      }
    }
  });

  //
  // Fitur quote
  //

  client.on('message', async msg => {
    const text = msg.body.toLowerCase() || '';

      // Untuk mendapatkan quote bahasa indonesia

      if (text === "#quoteid") {
        msg.reply('Silakan gunakan perintah \'#quoteid/kategori\', sebagai contoh #quoteid/asmaraloka\n\nDan berikut adalah daftar kategori yang tersedia:\n- Asmaraloka,\n- motivasi,\n- filosofi,\n- inspirasi,\n- humor');
      }

      if (text.startsWith("#quoteid/")) {
        const category = text.slice(9); // Get the category name from the command
        const quotesCategory = quotes[category];
      if (quotesCategory) {
        const randomQuote = quotesCategory[Math.floor(Math.random() * quotesCategory.length)];
        msg.reply(randomQuote);
      } else {
        msg.reply('Kategori tidak valid. Gunakan perintah: #quoteid/asmaraloka,\n#quoteid/motivasi,\n#quoteid/filosofi,\n#quoteid/inspirasi,\n#quoteid/humor');
      }
    }

    // Untuk mendapatkan quote internasional
});

client.on('message', async message => {
  const content = message.body.toLowerCase();

    if (content === '/quote') {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data;

        const quoteMsg = `Quote:\n\n${quote.content}\n\nAuthor: ${quote.author}`;

        message.reply(quoteMsg);
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil quote:', error);
        message.reply('Terjadi kesalahan dalam mengambil quote.');
    }
  }
});

  //
  // Fitur Meme dan jokes
  //

  client.on('message', async message => {
    const content = message.body;
  
    if (content === "/Meme") {
        message.reply('okk, bentar bang');
        const meme = await axios("https://meme-api.com/gimme").then(res => res.data);
        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url));
        
    } else if (content === '/Joke') {
        try {
            const joke = await axios("https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious").then(res => res.data)

            const jokeMsg = await client.sendMessage(message.from, joke.setup);
            if (joke.delivery) setTimeout(function() { jokeMsg.reply(joke.delivery) }, 2500);
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil joke:', error);
        }
    }

    const meme = message.body;
    if (meme === 'Meme' || meme === 'meme') {
        message.reply('Format kamu salah, ketikkan \'/Meme\' dimulai dengan tanda garis miring \'/\' diikuti dengan huruf awal kapital, selanjutnya kirimkan untuk mendapatkan perintah Meme');
    }
    
    const jokeask = message.body;
    if (jokeask === 'Joke' || jokeask === 'joke') {
        message.reply('Format kamu salah, ketikkan \'/Joke\' dimulai dengan tanda garis miring \'/\' diikuti dengan huruf awal kapital, selanjutnya kirimkan untuk mendapatkan perintah Meme');
    }
});

// Meme indonesia coy
function getRandomMemePath() {
  const folderPath = './memeid-host'; 
  const files = fs.readdirSync(folderPath);

  if (files.length === 0) {
    return null; // Jika folder kosong, kembalikan null
  }

  const randomIndex = Math.floor(Math.random() * files.length);
  const randomFilePath = `${folderPath}/${files[randomIndex]}`;
  return randomFilePath;
}

client.on('message', async message => {
  const content = message.body.toLowerCase();

  if (content === '/memeid') {
    const memeFilePath = getRandomMemePath();
    if (!memeFilePath) {
      message.reply('Maaf, tidak ada meme yang tersedia saat ini.');
      return;
    }

    // Kirim file meme sebagai media
    const media = MessageMedia.fromFilePath(memeFilePath);
    message.reply(media);

    // Kirim pesan tambahan
    setTimeout(() => {
      message.reply('Mwhehe, done gk bang?');
    }, 3500);
  }
});

  // Nyth AI

  const { API_KEY_OPEN_AI } = require('./config');

  const apiUrl = 'https://api.openai.com/v1/completions';
  
  // Standalone function to send a message to OpenAI
  async function sendMessageToOpenAI(message) {
    try {
      const response = await axios.post(apiUrl, {
        prompt: message,
        max_tokens: 1000, // Adjust the token limit according to your needs
        model: 'text-davinci-003', // Replace with the desired model
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY_OPEN_AI}`,
          'Content-Type': 'application/json',
        },
      });
  
      // The result from OpenAI is in response.data.choices[0].text
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error sending message to OpenAI:', error.message);
      return null;
    }
  }
  
    client.on('message', async (message) => {
      // Pastikan hanya merespon pesan dari pengguna dan bukan dari bot sendiri
      if (!message.fromMe) {
        const userMessage = message.body;
    
        if (userMessage.toLowerCase() === '/nythai') {
          // Hidupkan bot jika belum menyala
          if (!botIsActive) {
            botIsActive = true;
            message.reply('Fitur Chatbot AI sudah aktif, Selamat menggunakan!');
          } else {
            message.reply('Fitur Chatbot AI sudah aktif.');
          }
        } else if (userMessage.toLowerCase() === '/nythoff') {
          // Matikan bot jika sedang menyala
          if (botIsActive) {
            botIsActive = false;
            message.reply('Fitur Chatbot AI sudah dinonaktifkan, Terima kasih!');
          } else {
            message.reply('Fitur Chatbot AI sudah dinonaktifkan.');
          }
        } else if (botIsActive) {
          // Jika bot aktif, gunakan model ChatGPT untuk merespons pesan
          const openAIResponse = await sendMessageToOpenAI(userMessage);
    
          if (openAIResponse) {
            // Kirim balasan dari ChatGPT
            message.reply(openAIResponse);
          } else {
            message.reply('Maaf, terjadi kesalahan dalam memproses pesan Anda.');
          }
        }
      }
    });
  
    // Additional feature
  
    client.on('message', async message => {
      const content = message.body;
      
        if (content === '/nythai-info') {
          const commandList = '📖 Berikut adalah daftar menu yang ada:\n\n' +
            'i. Tentang Nyth AI 🤖\n' +
            'ii. Cek versi terbaru Nyth AI ⏳\n' +
            'iii. Berpartisipasi 📝\n\n' +
            'NB: Kirim angka romawinya saja untuk melihat jawaban.';
      
          message.reply(commandList);
        } else if (content === 'i') {
          const response = '🤖📚 Tentang Nyth AI 🌐🚀\n\nNyth AI adalah sahabat pintar yang berbasis Node.js dan memanfaatkan teknologi kecerdasan buatan dari OpenAI. Dengan menggunakan teknologi GPT-3 dengan model text-davinci-003 yang komprehensif, Nyth AI mampu memberikan respon yang menarik dan relevan dalam percakapan. Tujuan dari pembuatan Nyth AI adalah untuk menyediakan pengalaman belajar yang unik dan interaktif bagi pengguna.\n\nBergabunglah dengan Nyth AI dalam percakapan cerdas, dan temukan kebijaksanaan di balik kata-kata. Tanyakan apa saja, dan Nyth AI siap membantu dengan pengetahuan luasnya! 🌟🗣️\n\nSemoga harimu menyenangkan, Nerd Valley🛡🗡';
          message.reply(response);
  
        } else if (content === 'ii') {
          const response = '🌟🔄 Versi Terbaru Nyth AI 🆕🤖\n\n Nyth AI-v1.0\n\nJangan sampai tertinggal dengan perkembangan teknologi AI, Nyth AI kini hadir dengan versi terbaru yang lebih pintar dan unggul! 🚀🌟\n\nNikmati fitur-fitur canggih dan respon yang semakin relevan dari Nyth AI. Jadikan setiap percakapan lebih menarik dan informatif dengan bantuan kecerdasan buatan terkini!🌐🔮\n\nSemoga harimu menyenangkan, Nerd Valley🛡🗡';
          message.reply(response);
  
        } else if (content === 'iii') {
          const response = '🌐🔗 Kunjungi Repository Nyth AI di GitHub 🔗🌐\n\nIngin lebih dalam mengenal Nyth AI dan berkontribusi dalam perkembangan proyek ini?\n\nYuk, kunjungi repository resmi Nyth AI di GitHub! \'https://github.com/fromrha/NythAI-Whatsapp-Chatbot\' Di sana, kamu dapat melihat secara langsung kode dibalik Nyth AI, melaporkan masalah, dan berkolaborasi bersama saya untuk menciptakan masa depan kecerdasan buatan! 🚀🌟\n\nTunggu apa lagi? Ayo bergabung dengan komunitas kami di GitHub dan berpartisipasi dalam perjalanan menuju ketakterbatasan! 🤖💬\n\nSemoga harimu menyenangkan, Nerd Valley🛡🗡';
          message.reply(response);
        }
    
        const menu = message.body;
        if (menu === 'nythai-info' || menu === 'nythaiinfo' || menu === 'info' || menu === 'nythinfo') {
            message.reply('Format kamu salah, ketikkan \'/nythai-info\' dimulai dengan tanda garis miring \'/\' kirimkan untuk mendapatkan perintah Menu');
        }    
  });  


  //
  // Unsiq
  //
    // Fungsi untuk mengelola pesan masuk
    client.on('message', async (message) => {
      const sender = message.from;
      const text = message.body;
    
      // Cek jika pengguna mengirim perintah '/unsiq'
      if (text.toLowerCase() === '/unsiq') {
        // Mereset state pengguna menjadi "menunggu pilihan nomor"
        userState[sender] = 'menunggu_pilihan_nomor';
    
        // Mengirim pesan awal
        const initialResponse = "Terima kasih, berikut adalah informasi seputar kampus:\n1. Tentang Unsiq\n2. Informasi Terbaru Dari Unsiq\n3. Kredit\n\nNB: Kirim angkanya saja untuk melanjutkan.";
        await client.sendMessage(sender, initialResponse);
      }
    
      // Jika pengguna mengirim angka dan sedang dalam state "menunggu pilihan nomor"
      if (userState[sender] === 'menunggu_pilihan_nomor') {
        if (text === '1') {
          // Mengirim pesan pemberitahuan terlebih dahulu
          await client.sendMessage(sender, "Ini adalah informasi tentang Unsiq.");
          
          // Menunggu sebentar sebelum mengirim gambar
          await sleep(1000);
    
          // Mengirim gambar sebagai media terpisah
          const mediaPath = 'unsiq/unsiq_wonosobo.jpg';
          const mediaData = fs.readFileSync(mediaPath);
          const media = new MessageMedia('image/jpeg', mediaData);
          await client.sendMessage(sender, media);
    
          // Menunggu sebentar sebelum mengirim informasi lebih lanjut
          await sleep(1000);
    
          // Mengirim informasi tentang Unsiq dari file
          await client.sendMessage(sender, unsiqInfo);
        }
      }
    });
  
    // Fungsi untuk menunda eksekusi dalam milidetik
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //
  // Nyth - Update Log
  //


 let updateLog = "";

 function addUpdate(update) {
   updateLog += update + "\n";
 }

 addUpdate("2023-07-26~Nyth-v2.0: New Era Has Begun. Memperkenalkan \'Nyth AI\', mampu merespon pesan kamu dengan balasan yang relavan, ketik \'/nythai\' untuk lebih lanjut");
 addUpdate("2023-07-26~Nyth-v1.5: Bug fixes, Feature Improvement, Minor fixes");
 addUpdate("2023-07-26~Nyth-v1.4: Menambahkan Fitur baru \'/memeid\' untuk kalian yang ingin mendapatkan asupan meme bahasa indonesia. Menyunting tata letak menu log pembaruan. Menghapus mode aman untuk fitur \'/Joke\'");
 addUpdate("2023-07-22~Nyth-v1.3: Konfigurasi fitur baru. Menambahkan fitur '#fyi/bidang' dan memperbarui 'quoteid'. Serta membuat beberapa menu lain yang relavan.");
 addUpdate("2023-07-21~Nyth-v1.2: Menambahkan fitur /quoteid untuk mendapatkan quote bahasa indonesia secara acak dan perbaikan bug pada fitur Nyth-magic.");
 addUpdate("2023-07-20~Nyth-v1.1: Menambahkan fitur /Quote lalu memperbaiki beberapa malfungsi dan error.");
 addUpdate("2023-07-18~Nyth-beta.1.0: Nyth telah selesai dibuat dan lolos dalam tes. semua fitur awal telah bekerja .");
 addUpdate("2023-07-17~Nyth-alpha.0: Membuat kerangka awal Nyth.");

 function handleUpdateCommand(msg) {
   if (updateLog !== "") {
   msg.reply("Berikut adalah log update terbaru:\n\nNB: Perintah '/Update' memungkinkan kamu untuk memeriksa versi terbaru Nyth. Dengan perintah ini, kamu dapat dengan mudah untuk mendapat informasi tentang pembaruan dan peningkatan terbaru pada Nyth. Versi terbaru akan selalu muncul di bagian atas, membuatnya mudah diakses. Lakukan perintah ini untuk terus mengikuti perkembangan terbaru dari Nyth!\n\n" + updateLog);
 } else {
   msg.reply("Belum ada update terbaru.");
 }}

 client.on('message', async msg => {
   const text = msg.body.toLowerCase() || '';

   if (text === '/update') {
     handleUpdateCommand(msg);
   }
});

client.initialize();
