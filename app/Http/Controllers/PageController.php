<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Page;
use Illuminate\Support\Str;

use Inertia\Inertia;

class PageController extends Controller
{

public function index()
{
    $pages = Page::all(['id', 'title' ,'html' ,'status' ,'slug']); 
    return inertia('PagesList', ['pages' => $pages]);
}

public function store(Request $request)
{

$page = new Page();
$page->title = $request->title ??'Untitled Page' ;
$page->html = $request->html ;
$page->css = $request->css ;
$page->components = $request->components ;
$page->styles = $request->styles ;
$page->status = $request->status ;

$page->seo_title=$request->seoTitle;
$page->seo_description= $request->seoDescription;
$page->seo_keywords=$request->seoKeywords;


$slug = Str::slug($request->title ?? 'untitled-page');

$originalSlug = $slug;
$i = 1;
while (\App\Models\Page::where('slug', $slug)->exists()) {
    $slug = $originalSlug . '-' . $i++;
}

$page->slug = $slug;


$page->save();
    
      return redirect()->route('pages.index');
}

public function show(Page $page)
{
 
    return inertia('PageView', [
        'html' => $page->html,
        'css' => $page->css,
        'seoTitle' => $page->seo_title ,
        'seoDescription' => $page->seo_description,
        'seoKeywords' => $page->seo_keywords

    ]);
}


public function destroy($id)
{
    $page = Page::findOrFail($id);
    $page->delete();

    return redirect()->back()->with('success', 'Page deleted successfully.');
}

public function edit($id)
{
    $page = Page::findOrFail($id);

    return inertia('PageBuilder', [
        'id' => $page->id,
        'title' => $page->title,
        'html' => $page->html,
        'css' => $page->css,
        'components' => $page->components,
        'styles' => $page->styles,
        'status'=> $page->status,
        'seoTitle' => $page->seo_title,
        'seoDescription' => $page->seo_description,
        'seoKeywords' => $page->seo_keywords,
        

    ]);
}


public function update(Request $request, $id)
{
    $page = Page::findOrFail($id);
    $page->title = $request->title ;
    $page->html = $request->html ;
    $page->css = $request->css ;
    $page->components = $request->components ;
    $page->styles = $request->styles ;
    $page->status = $request->status ;

    $page->seo_title=$request->seoTitle;
    $page->seo_description= $request->seoDescription;
    $page->seo_keywords=$request->seoKeywords;

    $page->save();

      return redirect()->route('pages.index');
}

}
