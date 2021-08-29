#pragma once
#include "memorymap.h"

uint_8 UsableMemoryRegionCount;
MemoryMapEntry* UsableMemoryRegions[10];

void PrintMemoryMap(MemoryMapEntry* memoryMap, uint_16 position) {
    SetCursorPostion(position);

    PrintString("Memory Base: "); PrintString(integerToString(memoryMap->BaseAddress));
    SetCursorPostion(position + 80);
    PrintString("Region Length: "); PrintString(integerToString(memoryMap->RegionLength));
    SetCursorPostion(position + 160);
    PrintString("Memory Type: "); PrintString(integerToString(memoryMap->RegionType));
    SetCursorPostion(position + 240);
    PrintString("Memory Attributes: "); PrintString(integerToString(memoryMap->ExtemdedAttributes));
    SetCursorPostion(position + 400);
}

bool MemoryRegionGot = false;

MemoryMapEntry** GetUsableMemoryRegions() {

    if (MemoryRegionGot) {
        return UsableMemoryRegions;
    }

    uint_8 UsableRegionIndex;
    for (uint_8 i=0; i< MemoryRegionCount; i++) {
        MemoryMapEntry* memMap = (MemoryMapEntry*)0x5000;
        memMap += i;
        if (memMap->RegionType == 1) {
            UsableMemoryRegions[UsableRegionIndex] =memMap;
            UsableRegionIndex++;
        }
    }
    UsableMemoryRegionCount = UsableRegionIndex;

    MemoryRegionGot = true;
    return UsableMemoryRegions;
}