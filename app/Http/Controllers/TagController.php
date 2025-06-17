<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Models\Post_type;
class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $tags = Tag::with('postTypes:id,name')->select('id', 'name')->get();

        return inertia('AllTags' , [
        'tags' => $tags,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    $typeSlug = $request->query('type');
    $postType = Post_type::where('slug', $typeSlug)->firstOrFail();

    return inertia('TagCreate', [
        'postType' => $postType
    ]);
 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tag = new Tag();
        $tag->name = $request->name ;
        $tag->save() ;

        $tag->postTypes()->attach($request->post_type_id);
        
        return to_route('tag.index');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
         $tag = Tag::findOrFail($id);

          return inertia('TagEdit' , [
            'id' => $tag->id ,
            'name' => $tag->name ,
   
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         $tag = Tag::findOrFail($id);
         $tag->name = $request->name ;
         $tag->save() ;
        return to_route('tag.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
            $tag = Tag::findOrFail($id);
            $tag->delete();
            return to_route('tag.index');
    }
}
