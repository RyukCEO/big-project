#pragma once
#include "keyboard.h"

bool LeftShiftPressed = false;
bool RightShiftPressed = false;
uint_8 LastScancode;

void StandarKeyboardHandler(uint_8 scanCode, uint_8 chr) {
    if (chr != 0){
      switch (LeftShiftPressed | RightShiftPressed)
      {
        case true:
            PrintChar(chr - 32);
            break;
        case false: 
            PrintChar(chr);
            break;
      }
    }
    else {
        switch (scanCode) {
            case 0x8e: //backspace
            SetCursorPostion(CursorPosition - 1);
            PrintChar(' ');
            SetCursorPostion(CursorPosition - 1);
            break;
        case 0x2A: //Left Shift
            LeftShiftPressed = true;
            break;
        case 0xAA: //Left Shift Released
            LeftShiftPressed = false;
            break;
        case 0x3A: //Right Shift
            LeftShiftPressed = true;
            break;
        case 0xB6: //Right Shift Released
            LeftShiftPressed = false;
            break;
        case 0x9c: //Enter
            PrintString("\n\r");
            break;    
        }
    }
}

void keyboardhandler0xE0(uint_8 scanCode) {
    switch (scanCode)
    {
        case 0x50:
            SetCursorPostion(CursorPosition + VGA_WIDTH);
            break;
        case 0x48:
            SetCursorPostion(CursorPosition - VGA_WIDTH);    
            break;
        default:
            break;
    }
}
void KeyboardHandler(uint_8 scanCode, uint_8 chr) {
    
    switch (LastScancode) {
        case 0xE0:
        keyboardhandler0xE0(scanCode);
        break;
    default:
        StandarKeyboardHandler(scanCode, chr);
    }

    LastScancode = scanCode;
}