<!doctype html>

<html>

<head>

    @include('layout.head')

</head>

<body class="bg-gray-900 text-white min-h-screen flex flex-col">

    @yield('content')

    <!--   <footer>

            @include('layout.footer')

        </footer> -->

    @yield('scripts')

</body>

</html>
