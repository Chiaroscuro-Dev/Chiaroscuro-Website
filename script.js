// Initialize terminal commands and content
const terminalOutput = document.getElementById("output");
const commandInput = document.getElementById("command-input");

// Available commands and descriptions
const commands = {
    home: "Welcome to Chiaroscuro Dev. Type 'help' to see available commands.",
    help: "Available commands: \n - home: Returns to the home screen\n - help: Displays available commands\n - projects: Displays our projects\n - discord: Links to our Discord server\n - devs: Shows developer profiles\n",
    projects: "Current projects: \n 1. Project One - React app with real-time data sync\n 2. Project Two - Flutter mobile app\n 3. Project Three - Data visualization dashboard with D3.js.",
    discord: "Join our Discord server here: https://discord.gg/example",
    devs: {
        description: "Use 'devs [name]' to view individual developer profiles. Available devs: jane, john.",
        jane: "Jane Doe: Lead Developer specializing in front-end and UX design. Skills: React, JavaScript, CSS.",
        john: "John Smith: Full Stack Developer specializing in Node.js and cloud architecture. Skills: Node.js, AWS, Python."
    }
};

// Display output in the terminal
function displayOutput(text) {
    terminalOutput.innerHTML += `${text}\n`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;  // Auto-scroll to bottom
}

// Handle command input
commandInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = commandInput.value.trim().toLowerCase();
        executeCommand(command);
        commandInput.value = "";
    }
});

// Execute the entered command
function executeCommand(command) {
    displayOutput(`chiaroscuro-dev $ ${command}`);

    // Handle main commands
    if (command === "home") {
        displayOutput(commands.home);
    } else if (command === "help") {
        displayOutput(commands.help);
    } else if (command === "projects") {
        displayOutput(commands.projects);
    } else if (command === "discord") {
        displayOutput(commands.discord);
    } else if (command.startsWith("devs")) {
        handleDevsCommand(command);
    } else {
        displayOutput(`Command not found: ${command}`);
    }
}

// Handle 'devs' command with sub-commands
function handleDevsCommand(command) {
    const devArgs = command.split(" ");

    if (devArgs.length === 1) {
        displayOutput(commands.devs.description);
    } else if (devArgs[1] === "jane") {
        displayOutput(commands.devs.jane);
    } else if (devArgs[1] === "john") {
        displayOutput(commands.devs.john);
    } else {
        displayOutput(`Unknown developer: ${devArgs[1]}`);
    }
}

// Initialize terminal with the home command
displayOutput(commands.home);
