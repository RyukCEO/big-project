#include "TextPrint.h"
#include "IDT.h"
#include "keyboard.h"
#include "memorymap.h"
#include "heap.h"


extern "C" void _start() {
    SetCursorPostion(PositionFromCoords(0, 0));
    InitializeIDT();
    MainKeyboardHandler = KeyboardHandler;

    MemoryMapEntry** UsableMemoryMaps = GetUsableMemoryRegions();

    InitializeHeap(0x100000, 0x100000);
    

    PrintString("OS IS STILL IN DEVLOPMENT", BACKGROUND_BLINKINGRED | FOREGROUND_CYAN);
    PrintString("WELCOME TO OS");
    return;
}