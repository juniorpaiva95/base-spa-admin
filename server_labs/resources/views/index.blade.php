<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>{{ config('app.name', 'Laravel') }}</title>
	<link href="{{ asset('assets_template/css/icons/icomoon/styles.css') }}" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">
  <link rel="stylesheet" href="{{ asset('assets_template/css/bootstrap.css') }}">
  <link rel="stylesheet" href="{{ asset('assets_template/css/colors.css') }}">
  <link rel="stylesheet" href="{{ asset('assets_template/css/components.css') }}">
  <link rel="stylesheet" href="{{ asset('assets_template/css/core.css') }}">

</head>
<body>
  <div id="app"></div>

  {{ ScriptVariables::render() }}
  <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
