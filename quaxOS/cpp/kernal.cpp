#include "TextPrint.h"
#include "IDT.h"
#include "keyboard.h"
#include "memorymap.h"


extern "C" void _start() {
    SetCursorPostion(PositionFromCoords(0, 0));
    InitializeIDT();
    MainKeyboardHandler = KeyboardHandler;

    MemoryMapEntry** UsableMemoryMaps = GetUsableMemoryRegions();

    for (uint_8 i=0; i < UsableMemoryRegionCount; i++) {
        MemoryMapEntry* memMap = UsableMemoryMaps[i];
        PrintMemoryMap(memMap, CursorPosition);
    }

    PrintString("OS IS STILL IN DEVLOPMENT", BACKGROUND_BLINKINGRED | FOREGROUND_CYAN);
    PrintString("WELCOME TO OS");
    return;
}