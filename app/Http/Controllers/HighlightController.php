<?php

namespace App\Http\Controllers;

use App\Models\Highlight;
use Illuminate\Http\Request;
use App\Models\Post_type;

class HighlightController extends Controller
{
      public function index()
    {
        
        $highlights = Highlight::with('postTypes:id,name')->select('id', 'name')->get();

        return inertia('Allhighlight' , [
        'highlights' => $highlights,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    $typeSlug = $request->query('type');
    $postType = Post_type::where('slug', $typeSlug)->firstOrFail();

    return inertia('HighlightCreate', [
        'postType' => $postType
    ]);
 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $highlight = new Highlight();
        $highlight->name = $request->name ;
        $highlight->save() ;

        $highlight->postTypes()->attach($request->post_type_id);
        
        return to_route('highlight.index');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Highlight $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */


    public function edit($id)
    {
         $highlight = Highlight::findOrFail($id);

          return inertia('HighlightEdit' , [
            'id' => $highlight->id ,
            'name' => $highlight->name ,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         $highlight = Highlight::findOrFail($id);
         $highlight->name = $request->name ;
         $highlight->save() ;
        return to_route('highlight.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
            $highlight = Highlight::findOrFail($id);
            $highlight->delete();
            return to_route('highlight.index');
    }
}
