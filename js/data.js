// Handle event subscriptions and listen for data sent from the server
cef.on("game:hud:setComponentVisible", (component, visible) => {
    if (component === "interface") {
        document.getElementById("interface").style.display = visible ? "block" : "none";
    }
    if (component === "radar") {
        document.getElementById("radar").style.display = visible ? "block" : "none";
    }
});

cef.on("game:data:pollPlayerStats", (hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed) => {
    document.getElementById("health").textContent = `${hp} / ${max_hp}`;
    document.getElementById("armor").textContent = `${arm}`;
    document.getElementById("breath").textContent = `${breath}`;
    document.getElementById("wanted").textContent = `Wanted: ${wanted}`;
    document.getElementById("weapon").src = `./img/weapons/${weapon}.png`;
    document.getElementById("ammo").textContent = `${ammo} / ${max_ammo}`;
    document.getElementById("money").textContent = `$${money}`;
    document.getElementById("speed").textContent = `${speed}`;
});

cef.on("data:pool:health", (health) => {
    document.getElementById("healths").textContent = health;
});

cef.on("data:pool:players", (players) => {
    document.getElementById("players").textContent = players;
});

cef.on("data:pool:bankmoney", (bankmoney) => {
    document.getElementById("pBank").textContent = bankmoney;
});

cef.on("data:pool:cashmoney", (cashmoney) => {
    document.getElementById("pCash").textContent = cashmoney;
});

cef.on("data:pool:giftbox", (giftbox) => {
    document.getElementById("giftboxtime").textContent = giftbox;
});

cef.on("data:pool:greenzone", (greenzone) => {
    document.getElementById("greenzonediv").style.display = greenzone ? "flex" : "none";
});

cef.on("data:pool:radial", (radial) => {
    document.getElementById("radialka").style.display = radial ? "block" : "none";
});

cef.on("data:pool:fuelOn", (fuelOn) => {
    document.getElementById("fuelSadguri").style.display = fuelOn ? "block" : "none";
});

cef.on("data:pool:shop", (shop) => {
    document.getElementById("shop").style.display = shop ? "block" : "none";
});

cef.on("data:pool:gpson", (gpson) => {
    if (gpson) {
        document.getElementById("gpsdiv").style.display = "flex";
        document.getElementById("gpsloc").textContent = `Location: ${gpson}`;
    } else {
        document.getElementById("gpsdiv").style.display = "none";
        document.getElementById("gpsloc").textContent = "";
    }
});

cef.on("data:pool:channelname", (channelname) => {
    const channelElement = document.getElementById("channel");
    const channelNameElement = document.getElementById("channelname");
    if (channelname) {
        channelElement.style.display = "block";
        channelNameElement.textContent = `Channel: ${channelname}`;
    } else {
        channelElement.style.display = "none";
        channelNameElement.textContent = "";
    }
});

cef.on("data:pool:wantedlevel", (wantedlevel) => {
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`wanted${i}`).style.display = "none";
    }

    for (let i = 1; i <= wantedlevel; i++) {
        document.getElementById(`wanted${i}`).style.display = "flex";
    }
});

cef.on("data:vehicle", (carspeed, cardoor, carengine, carfuel) => {
    const speedElement = document.getElementById("hud-speedometer");
    const fuelElement = document.getElementById("hud-fuel");

    const speedPercentage = carspeed / 420; // Assume max speed is 420
    const speedOffset = 504.295 * (1 - speedPercentage);
    speedElement.style.strokeDashoffset = speedOffset;

    const fuelPercentage = carfuel / 100; // Max fuel is 100
    const fuelOffset = 208.907 * (1 - fuelPercentage);
    fuelElement.style.strokeDashoffset = fuelOffset;

    document.getElementById("textspeed").textContent = carspeed;

    const engineElement = document.getElementById("eng");
    engineElement.classList.toggle("off", !carengine);
    engineElement.classList.toggle("on", carengine);

    const doorElement = document.getElementById("door");
    doorElement.classList.toggle("off", !cardoor);
    doorElement.classList.toggle("on", cardoor);
});

cef.on("data:pool:notification", (notification) => {
    switch (notification) {
        case 1:
            showNotification("Car engine started successfully");
            break;
        case 2:
            showNotification("Car engine stopped successfully");
            break;
        case 3:
            showNotification("Car door opened successfully");
            break;
        case 4:
            showNotification("Car door closed successfully");
            break;
        case 5:
            showNotification("You have passed boss authorization");
            break;
        case 6:
            showNotification("No fuel in the car");
            break;
        case 7:
            showNotification("You drained the car, $2500 was deducted");
            break;
        case 8:
            showNotification("No fuel in the car");
            break;
    }
});

cef.on("data:pool:infotxt", (infotxt) => {
    showNotification(infotxt);
});

cef.on("data:pool:errortxt", (errortxt) => {
    showError(errortxt);
});

// Function to show notifications
function showNotification(text) {
    const bar = document.getElementById('notification-bar');
    const message = document.getElementById('message');
    bar.classList.remove('hidden');
    bar.classList.add('notification', 'visible');
    message.textContent = text;

    setTimeout(() => {
        bar.classList.remove('visible');
        bar.classList.add('hidden');
    }, 3000);
}

// Function to show error messages
function showError(text) {
    const bar = document.getElementById('notification-bar');
    const message = document.getElementById('message');
    bar.classList.remove('hidden');
    bar.classList.add('error', 'visible');
    message.textContent = text;

    setTimeout(() => {
        bar.classList.remove('visible');
        bar.classList.add('hidden');
    }, 3000);
}
