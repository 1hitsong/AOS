# Path to your local repository
$repoDirectory = "E:\Repos\AOS"
# Path to your emulator directory
$emulatorDirectory = "C:\MyUser\AppData\Local\Android\Sdk\tools"

$switchToRepoDirectoryCommand = "cd '$repoDirectory'"
$switchToEmulatorDirectoryCommand = "cd '$emulatorDirectory'"
$startExpoAppLocalDebugCommand = "npx expo start --lan"
$startEmulatorCommand = ".\emulator -avd Pixel_6_Pro_API_33"

function Open-Emulator {
    $commands = "$switchToEmulatorDirectoryCommand; $startEmulatorCommand"
    Start-Process powershell -ArgumentList "-NoExit","-Command $commands"
}

function Open-ExpoApp {
    $commands = "$switchToRepoDirectoryCommand; $startExpoAppLocalDebugCommand"
    Start-Process powershell -ArgumentList "-NoExit","-Command $commands"
}

function Open-ReactNativeDebugger {
    Start-Process powershell -ArgumentList "-NoExit","-Command react-devtools"
}

function Open-RepoDirectory {
    Start-Process powershell -ArgumentList "-NoExit","-Command $switchToRepoDirectoryCommand"
}

Open-Emulator
Open-ExpoApp
Open-ReactNativeDebugger
Open-RepoDirectory
