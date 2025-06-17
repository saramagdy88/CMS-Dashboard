<?php

namespace App\Models;
use App\Models\Post ;
use App\Models\Post_type ;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{


public function postTypes()
{
    return $this->belongsToMany(Post_type::class,'tag_post_type');
}

public function posts()
{
    return $this->belongsToMany(Post::class,'tag_post');
}


}
