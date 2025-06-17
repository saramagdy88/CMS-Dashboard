<?php

namespace App\Models;
use App\Models\Category ;
use App\Models\Highlight ;

use App\Models\Post_type ;
use App\Models\Tag ;



use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
      protected $fillable = [
        'title',
        'content',
        'status',
        'seo_title',
        'seo_description',
        'seo_keywords'


    ];

    // App\Models\Post.php

public function getComponentIdAttribute()
    {
        if (preg_match('/\[component id=(\d+)\]/', $this->content, $matches)) {
            return (int) $matches[1];
        }

        return null;
    }

    public function getComponent()
    {
        return $this->component_id
            ? PostComponent::find($this->component_id)
            : null;
    }




public function post_type()
{
    return $this->belongsTo(Post_type::class);
}

public function categories()
{
    return $this->belongsToMany(Category::class);
}

public function tags()
{
    return $this->belongsToMany(Tag::class ,'tag_post');
}

public function highlights()
{
    return $this->belongsToMany(Highlight::class ,'highlight_post');
}



}
