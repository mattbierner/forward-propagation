<div align="center" >
    <img src="https://raw.githubusercontent.com/mattbierner/forward-propagation/master/images/logo.png" alt="Forward Propagation" />
</div>

*Forward Propagation* is a simple tool for looking at recent human history in terms of generations instead of years.

## Usage
Play around with the controls to explore the distance between historical events and how much can change in a generation.
<div align="center" >
    <img src="https://raw.githubusercontent.com/mattbierner/forward-propagation/master/documentation/example.png" alt="Forward Propagation" />
</div>

#### Mode
How to propagate generations:

* Backwards - Start at last point in time and work backwards.
* Forwards - Start at first point in time and work forwards.
* Bidirectional - Show both forwards and backwards. This doubles the number of generations shown.

#### Year
Starting year. For `forwards`, this is the start of the first generation. For `backwards`, this is the end of the last generation.

#### Generations
Number of generations, between 1 and 500, to display.

#### Generation Length
How long does a single generation last (i.e. lifespan.)

#### Generation Overlap
How long does a generation overlap with the next generation? There are a few ways to think about this:

For *generational telephone* (i.e. knowledge transfer or passing down stories), `overlap` is the length of time the a given generation can know the previous generation. For example, with `generation length = 50` and `overlap = 30`, each generation (except the first and last) can know the previous generation from age `0` to `30`, know the next generation from age `50 - 30 = 20` to `50`, and know both the next and previous generations from age `20` to `30`.

For genetic/familial generations, overlap is a proxy for when the current generation produces the next generation: `next generation produced = generation length - overlap`. For example, with `generation length = 50` and `overlap = 30`, each generation produces the next generation at age `20` and then continues along for `30` more years, alongside their offspring. From age `40` to `50` of the original generation, the offspring now have produced an offspring generation of their own.


## Building and Running
The website uses [Jekyll](http://jekyllrb.com/) and [Webpack](http://webpack.github.io/) for building:

```bash
$ cd forward-propagation
$ git checkout gh-pages
$ npm install
```

Start Jekyll with:

```bash
$ jekyll serve -w
```

Start webpack with:

```bash
$ webpack --watch
```

Main Javascript is stored in `src` and output to `js`.