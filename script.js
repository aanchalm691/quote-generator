const container = document.getElementById("quotes");
    const loader = document.getElementById("loader");

    async function fetchQuotes() {
      loader.style.display = "block";
      container.innerHTML = "";

      try {
        const res = await fetch("https://api.freeapi.app/api/v1/public/quotes");
        const json = await res.json();

        const quotes = json.data.data;

        loader.style.display = "none";

        displayQuotes(quotes);

      } catch (error) {
        loader.innerText = "Failed to load";
      }
    }

    function displayQuotes(quotes) {
      container.innerHTML = quotes.map(q => `
        <div class="card">

          <div class="quote">“${q.content}”</div>

          <div class="author">— ${q.author}</div>

          <div class="btns">
            <button class="copy" onclick="copyQuote('${q.content}')">
              Copy
            </button>

            <button class="new" onclick="fetchQuotes()">
              New
            </button>
          </div>

        </div>
      `).join("");
    }

    function copyQuote(text) {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }

    fetchQuotes();