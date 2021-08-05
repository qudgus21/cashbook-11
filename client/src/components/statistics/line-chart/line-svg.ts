export default function lineSvg(monthPay, color){ 
    let _svg = document.getElementById('line-svg'),
        dati = monthPay,   
        chart_padding = 20,
        padding_asse_y = 40, 
        padding_asse_x = 20, 
    
        valore_massimo_asse_y = dati.reduce(function(prev, current) { 
            return Math.max(prev, Number(current[1]));
        }, 0),
    
        punti_asse_x = dati.length - 1,
    
        stroke_width_assi = 1,
    
        altezza = 400,
        altezza_corretta = altezza - (chart_padding*2) - padding_asse_x,  
    
        base = 600,
        base_corretta = base - (chart_padding*2) - padding_asse_y
    ;
    

    let parametro_arrotondamento = 10;
    if( valore_massimo_asse_y > 100 ) { parametro_arrotondamento = 100; }
    if( valore_massimo_asse_y > 1000 ) { parametro_arrotondamento = 1000; }
    valore_massimo_asse_y = Math.ceil( valore_massimo_asse_y/parametro_arrotondamento )* parametro_arrotondamento;
    
    let asse_y = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    asse_y.setAttribute("x1", (chart_padding + padding_asse_y).toString() );
    asse_y.setAttribute("y1", (chart_padding).toString() );
    asse_y.setAttribute("x2", (chart_padding + padding_asse_y).toString() );
    asse_y.setAttribute("y2", (chart_padding + altezza_corretta).toString() );
    asse_y.setAttribute("stroke_width", (stroke_width_assi).toString() );
    asse_y.setAttribute("class", 'asse' );
    _svg.appendChild( asse_y );
    
    let asse_x = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    asse_x.setAttribute("x1", (chart_padding + padding_asse_y).toString() );
    asse_x.setAttribute("y1", (chart_padding + altezza_corretta).toString());
    asse_x.setAttribute("x2", (chart_padding + padding_asse_y + base_corretta).toString() );
    asse_x.setAttribute("y2", (chart_padding + altezza_corretta).toString() );
    asse_x.setAttribute("stroke_width", (stroke_width_assi).toString() );
    asse_x.setAttribute("class", 'asse' );
    _svg.appendChild( asse_x );

    
    let _step = 8,
        _lunghezza_trattino = 5,
        _trattino,
        _etichetta,
        _divider,
        testo_etichetta,
        font_size_etichetta=9,
        valore_step,
        x1_trattino = chart_padding + padding_asse_y - _lunghezza_trattino,
        x2_trattino = chart_padding + padding_asse_y ,
        x_etichetta = chart_padding + padding_asse_y - (_lunghezza_trattino * 2),
        y_etichetta
    ;
    
    for(let i = 0; i <= _step; i++ ) {
        valore_step = (valore_massimo_asse_y / _step) * i;
    
        y_etichetta = (chart_padding + altezza_corretta) - ((altezza_corretta / _step) * i);
    
        _trattino= document.createElementNS("http://www.w3.org/2000/svg", 'line');
        _trattino.setAttribute("x1", x1_trattino );
        _trattino.setAttribute("y1", y_etichetta );
        _trattino.setAttribute("x2", x2_trattino + (stroke_width_assi/2));
        _trattino.setAttribute("y2", y_etichetta );
        _trattino.setAttribute("class", 'trattino' );
        _trattino.setAttribute("stroke_width", stroke_width_assi );
        _svg.appendChild( _trattino );
    
        _etichetta= document.createElementNS("http://www.w3.org/2000/svg", 'text');
        _etichetta.setAttribute("x", x_etichetta );
        _etichetta.setAttribute("y", y_etichetta + (font_size_etichetta/3));
        _etichetta.setAttribute("class", 'etichetta' );
        testo_etichetta = document.createTextNode(valore_step);
        _etichetta.style.fontSize = font_size_etichetta + 'px';
        _etichetta.appendChild(testo_etichetta);
        _svg.appendChild( _etichetta );
    
        _divider= document.createElementNS("http://www.w3.org/2000/svg", 'line');
        _divider.setAttribute("x1", chart_padding + padding_asse_y );
        _divider.setAttribute("y1", y_etichetta );
        _divider.setAttribute("x2", chart_padding + padding_asse_y + base_corretta);
        _divider.setAttribute("y2", y_etichetta );
        _divider.setAttribute("class", 'divider' );
        _svg.appendChild( _divider );
    }
    
    _step = punti_asse_x;
    
    let y1_trattino = chart_padding + altezza_corretta - _lunghezza_trattino,
        y2_trattino = y1_trattino + (_lunghezza_trattino * 2)
    ;
    
    y_etichetta = y2_trattino + (_lunghezza_trattino * 2);
    
    for(let i = 0; i <= punti_asse_x; i++ ) {
        x_etichetta = chart_padding + padding_asse_y + ((base_corretta/_step) * i);
    
        _trattino= document.createElementNS("http://www.w3.org/2000/svg", 'line');
        _trattino.setAttribute("x1", x_etichetta );
        _trattino.setAttribute("y1", y1_trattino );
        _trattino.setAttribute("x2", x_etichetta);
        _trattino.setAttribute("y2", y2_trattino );
        _trattino.setAttribute("class", 'trattino' );
        _trattino.setAttribute("stroke_width", stroke_width_assi );
        _svg.appendChild( _trattino );
    
        _etichetta= document.createElementNS("http://www.w3.org/2000/svg", 'text');
        _etichetta.setAttribute("x", x_etichetta );
        _etichetta.setAttribute("y", y_etichetta);
        _etichetta.setAttribute("class", 'etichetta middle' );
        testo_etichetta = document.createTextNode((dati[i][0]).toString());
        _etichetta.style.fontSize = font_size_etichetta + 'px';
        _etichetta.appendChild(testo_etichetta);
        _svg.appendChild( _etichetta );
    
    }
    
    let coord = [],
        points =[];
    
    
    dati.forEach(function (item: any, idx) {

        let i:any = {label: item[0], value: item[1], index: idx};
        i.x = Math.round((base_corretta / punti_asse_x) * idx) + chart_padding + padding_asse_y;
        i.y = Math.round(altezza - ((altezza_corretta * item[1]) / valore_massimo_asse_y)  - chart_padding - padding_asse_x);
        coord.push(i);
        points.push(i.x +',' +i.y);
    });
    
    let poly = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
    poly.setAttribute("points", points.join(' '));
    _svg.appendChild(poly);
    poly.setAttribute('stroke-dasharray', `${poly.getTotalLength()}`);
    poly.setAttribute('stroke-dashoffset', `${poly.getTotalLength()}`);
    poly.style.stroke = color;
    coord.forEach(function (item) {

        let _circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        _circle.setAttribute("cx", item.x);
        _circle.setAttribute("cy", item.y);
        _circle.setAttribute("r", '5');
        _circle.setAttribute("class", 'point_symbol');
        _circle.style.stroke = color;
        _circle.classList.add(item.value)
        _svg.appendChild( _circle );
    });
}


