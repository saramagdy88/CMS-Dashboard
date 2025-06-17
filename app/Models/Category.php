<?php

namespace App\Models;
use App\Models\Post ;
use App\Models\Post_type ;

use App\Models\Taxonomy ;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'] ;


public function postTypes()
{
    return $this->belongsToMany(Post_type::class,'category_post_type');
}

public function posts()
{
    return $this->belongsToMany(Post::class);
}



}
