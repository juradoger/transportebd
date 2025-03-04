<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sistema de Gestión de Transporte</title>
<!-- Tailwind CSS via CDN -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#037995',
                    secondary: '#CE4B85',
                }
            }
        }
    }
</script>
<!-- Alpine.js para interactividad -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<style>
    .grid-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: 50px 50px;
        background-image:
            linear-gradient(to right, rgba(3, 121, 149, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(3, 121, 149, 0.1) 1px, transparent 1px);
        transform: perspective(500px) rotateX(60deg);
        transform-origin: center top;
        opacity: 0.3;
    }

    @keyframes pulse {
        0% {
            opacity: 0.1;
        }

        50% {
            opacity: 0.3;
        }

        100% {
            opacity: 0.1;
        }
    }

    .bg-pulse {
        animation: pulse 4s infinite;
    }

    /* Estilos para los asientos */
    .seat {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .seat-available {
        background-color: #6B7280;
    }

    .seat-available:hover {
        background-color: #4B5563;
    }

    .seat-selected {
        background-color: #037995;
        color: white;
    }

    .seat-occupied {
        background-color: #1F2937;
        cursor: not-allowed;
    }
</style>
