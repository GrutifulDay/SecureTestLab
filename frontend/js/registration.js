/**
 * ✅ Registrace uživatele (frontend)
 * - Odesílá registrační formulář na backend
 * - Kontroluje, zda hesla souhlasí a zda mají správnou délku
 * - Ukládá uživatelské jméno do localStorage
 * - Přesměrovává na stránku "welcome.html" po úspěšné registraci
 */

document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // ✅ Zabráníme výchozímu odeslání formuláře

    const form = event.target; // ✅ Uložíme si celý formulář
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // ✅ Reset chybové zprávy
    errorMessage.textContent = "";

    // ✅ Ověření hesla
    if (password !== confirmPassword) {
        errorMessage.textContent = "Hesla se neshodují";
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = "Heslo musí mít alespoň 6 znaků";
        return;
    }

    console.log("➡️ Odesílám request na backend:", { name, email, password });

    try {
        // ✅ Odesílání dat na backend
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Registrace selhala");
        }

        const data = await response.json(); // ✅ Odpověď parsujeme pouze jednou
        console.log("✅ Registrace úspěšná!", data);

        // ✅ Uložení jména do localStorage
        try {
            localStorage.setItem("username", name);
        } catch (e) {
            console.warn("⚠️ Nelze uložit do localStorage:", e);
        }

        // ✅ Přesměrování na uvítací stránku
        window.location.href = "welcome.html";

        form.reset(); // ✅ Reset formuláře po úspěšné registraci

    } catch (error) {
        errorMessage.textContent = error.message;
        console.error("❌ Chyba registrace:", error.message);
    }
});
