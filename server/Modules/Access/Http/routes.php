<?php

Route::group(['middleware' => 'web', 'prefix' => 'access', 'namespace' => 'Modules\Access\Http\Controllers'], function()
{
    Route::get('/', 'AccessController@index');
});
