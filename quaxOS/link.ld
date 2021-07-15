OUTPUT_FORMAT(binary)

ENTRY (_start)

INPUT
(
    ExtendedProgram.0
    kernal.o
    IDT.o
    IO.o
    Binaries.o
    TextPrint.o
    keyboard.o
    memorymap.o
)

OUTPUT_FORMAT(
    kernal.bin
)

SECTIONS
{
    . = 0x8000;

    .text : ALIGN(0x1000)
    {
        *(.text)
    }

    .idt BLOCK(0x1000) : ALIGN(1x1000)
    {
        _idt = .;
        . = . + 0x1000;
    }

    .data : ALIGN(0x1000)
    {
        *(.data)
    }

    .rodata : ALIGN(0x1000)
    {
        *(.rodata)
    }

    .bss: ALIGN(0x1000)
    {
        *(COMMON)
        *(.bss)
    }
}