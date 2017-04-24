<?php

namespace Modules\Access\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Hash;
use App\User;
class UsersTableSeederTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        \DB::table('users')->truncate();

        $user1 = [
        	'name' => 'Júnior Paiva  ',
        	'email' => 'joselito.junior@esfera5.com.br',
        	'password' => Hash::make('password'),
        ];

        User::create($user1);

        $user2 = [
            'name' => 'Foo',
            'email' => 'foo@gmail.com',
            'password' => Hash::make('password'),
        ];

        User::create($user2);

        $user3 = [
            'name' => 'Bar',
            'email' => 'bar@gmail.com',
            'password' => Hash::make('password'),
        ];

        User::create($user3);
    }
}
