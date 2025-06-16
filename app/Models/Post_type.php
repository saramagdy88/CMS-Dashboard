<?php

namespace App\Models;
use App\Models\Post ;
use App\Models\Category ;

use Illuminate\Database\Eloquent\Model;

class Post_type extends Model
{

public function posts()
{
        return $this->hasMany(Post::class);
}


public function categories()
{
    return $this->belongsToMany(Category::class,'category_post_type');
}



}
