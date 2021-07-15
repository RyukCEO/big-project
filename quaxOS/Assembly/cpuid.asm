
Detectcpuid:
    pushfd
    pop eax

    mov ecx, eax

    cor eax, 1 << 21

    push eax
    popfd

    popfd
    pop eax

    pushecx
    popfd

    xor eax,ecx
    jz NOCPUID
    ret

DetectLongMode:
    mov eax, 0x80000001
    cpuid
    test edx, 1 << 29
    jz
    ret

NoLongModeL
    hlt ; no long mode support
NOCPUID:
    hlt ; no cpu id support.