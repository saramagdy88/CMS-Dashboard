<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PostTypeController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaxonomyController;







Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/user/dashboard', function () {
    return Inertia::render('UserDashboard');
})->middleware(['auth', 'verified'])->name('user.dashboard');


Route::resource('user', UserController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';



Route::get('/charts', function () {
    return Inertia::render('Charts');
})->middleware(['auth']);

Route::get('/types', function () {
    return Inertia::render('PostTypes');
});

Route::get('/api/post-types', [PostTypeController::class, 'index'])->name('type.index');


// Middleware
// Route::middleware(['auth', 'permission:Posts'])->group(function () {
//     Route::resource('posts', PostController::class);
// });

Route::middleware(['auth', 'permission:Pages'])->group(function () {

Route::get('/page-builder', function () {
    return Inertia::render('PageBuilder');
})->name('page.builder');


Route::post('/pages', [PageController::class, 'store'])->name('pages.store');
Route::get('/pages/index', [PageController::class, 'index'])->name('pages.index');


// show page using slug
Route::get('/pages/{page:slug}', [PageController::class, 'show'])->name('pages.show');;

Route::delete('/pages/{id}/delete', [PageController::class, 'destroy'])->name('pages.destroy');

Route::get('/pages/{id}/edit', [PageController::class, 'edit'])->name('pages.edit');

Route::put('/pages/{id}/update', [PageController::class, 'update'])->name('pages.update');
});

// Media
Route::post('/media/upload', [MediaController::class, 'upload'])->name('media.upload');
Route::get('/media/list', [MediaController::class, 'index'])->name('media.list');

Route::post('/media/delete', [MediaController::class, 'delete']);


Route::resource('tour', TourController::class);

// route for create
Route::get('/post/{slug}/create', [PostController::class, 'create'])->name('post.create');


Route::get('/post/{id}/{slug}/edit', [PostController::class, 'edit'])->name('post.edit');
Route::delete('/post/{id}', [PostController::class, 'destroy'])->name('post.destroy');

Route::put('/post/{id}/{slug}', [PostController::class, 'update'])->name('post.update');


Route::get('/post/slug/{id}', [PostController::class, 'show'])->name('post.show');
Route::post('/post/store', [PostController::class, 'store'])->name('post.store');


Route::get('/post/{slug}', [PostController::class, 'index'])->name('post.index');



Route::resource('post_type', PostTypeController::class);

Route::resource('category', CategoryController::class);

