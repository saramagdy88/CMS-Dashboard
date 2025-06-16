<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Post_type;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('postTypes:id,name')->select('id', 'name' ,'slug')->get();

        return inertia('AllCategory' , [
        'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    $typeSlug = $request->query('type');
    $postType = Post_type::where('slug', $typeSlug)->firstOrFail();

    return inertia('CategoryCreate', [
        'postType' => $postType
    ]);
 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->name ;
        $category->slug = $request->slug ;
        $category->save() ;

        $category->postTypes()->attach($request->post_type_id);
        
        return to_route('category.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
         $category = Category::findOrFail($id);

          return inertia('CategoryEdit' , [
            'id' => $category->id ,
            'name' => $category->name ,
            'slug' => $category->slug ,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         $category = Category::findOrFail($id);
         $category->name = $request->name ;
         $category->slug = $request->slug ;
         $category->save() ;
        return to_route('category.index');
        

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
            $category = Category::findOrFail($id);
            $category->delete();
            return to_route('category.index');


    }
}
