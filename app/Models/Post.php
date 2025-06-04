<?php

namespace App\Models;
use App\Models\Category ;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
      protected $fillable = [
        'title',
        'content',
        'status',
        'category_id',
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




    public function category()
{
    return $this->belongsTo(Category::class);
}


}
