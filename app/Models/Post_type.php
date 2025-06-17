<?php

namespace App\Models;
use App\Models\Post ;
use App\Models\Category ;
use App\Models\Tag ;
use App\Models\Highlight ;



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

public function tags()
{
    return $this->belongsToMany(Tag::class ,'tag_post_type');
}

public function highlights()
{
    return $this->belongsToMany(Highlight::class,'high_post_type');
}

}
