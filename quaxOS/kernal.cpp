#include "TextPrint.cpp"
#include "IDT.cpp"
#include "keyboard.cpp"


extern "C" void _start() {
    SetCursorPostion(PositionFromCoords(0, 0));
    InitializeIDT();

    MainKeyboardHandler = KeyboardHandler;

    PrintString("OS IS STILL IN DEVLOPMENT", BACKGROUND_BLINKINGRED | FOREGROUND_CYAN);
    PrintString("WELCOME TO OS");
    return;
}