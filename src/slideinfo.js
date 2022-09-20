window.onload = ()=>{
    const slideinfo = function(){

        //create a class to render each parent
        class Slider{
            constructor(element, feather_color, title_color, detail_color){
                this.element = element
                this.feather_color = feather_color || 'white'
    
                //get all the class containing slide-info-child of this parent element
                let child_class = element.querySelectorAll('.slideinfo_child')
                const child = Array.from(child_class)
                
                if(child.length == 0) return
    
                //loop through all parent element
                let child_arr = []
                for (let j = 0; j < child.length; j++) {
                    const element_child = child[j];
                    // console.log(element_child)
    
                    //get Image 
                    let image = element_child.querySelector('img')
                    image = image != null ? image.src : false
                    if(image == false) continue
                    // console.log(image)
    
                    //get title 
                    let title = element_child.querySelector('[data-slideinfo_title]') || element_child.querySelector('h2')
                    title = title.textContent
                    // console.log(title)
    
                    //get title 
                    let info = element_child.querySelector('[data-slideinfo_detail]')  ||  element_child.querySelector('p')
                    info = info.textContent
                    // console.log(info)
    
                    child_arr.push({
                        image,
                        title,
                        info
                    })
                    
                }
    
                // console.log(child_arr)
    
                if(child_arr.length == 0) return
    
    
                let container = element
    
                //clear our parent element
                container.innerHTML = ''
    
                //create new element for the parent
                let wrapper = document.createElement('div')
    
                //append wrapper to container
                container.appendChild(wrapper)
    
                //set styleshhet to wrapper
                wrapper.style.cssText = 'width: 100%; height: 100%; position: relative; max-width: 100%; overflow: hidden;'
    
                //create images wrapper 
                let images_wrapper = document.createElement('div')
                wrapper.appendChild(images_wrapper)
                images_wrapper.style.cssText = `position: relative; display: flex; width: 100%; overflow: hidden;`
                // images_wrapper.style.maxHeight = `${container.clientHeight}px`
    
    
    
                //create img tag
                let imageIn = document.createElement('img')
                imageIn.src = child_arr[0].image
    
                images_wrapper.appendChild(imageIn)
                imageIn.style.cssText = 'position: relative; width: 100%; min-width: 100%;'
    
                let imageOut = document.createElement('img')
    
                images_wrapper.appendChild(imageOut)
                imageOut.style.cssText = 'position: relative; width: 100%; min-width: 100%;'
    
                //create container for text
                let text_div = document.createElement('div')
                wrapper.appendChild(text_div)
    
                text_div.style.cssText = `width: 100%; height: 100%; max-width: 100%; display: flex; align-items: flex-start; justify-content: flex-end; flex-direction: column; flex-wrap: wrap; position: absolute; top: 0px; left: 0px; background: linear-gradient(to bottom, transparent, transparent, transparent, ${this.feather_color}, ${this.feather_color});`
    
                //set title text in text_div
                let title = document.createElement('h1')
                title.textContent = child_arr[0].title
                text_div.appendChild(title)
    
                title.style.cssText = `margin: 0px; padding: 0.5em; color: ${title_color}`
    
                //set title text in text_div
                let info = document.createElement('p')
                info.textContent = child_arr[0].info
                text_div.appendChild(info)
    
                info.style.cssText = `margin: 0px; padding: 0.5em; margin-bottom: 10px; color: ${detail_color}`
    
    
                //create slide dots
                let dot_div = document.createElement('div')
                wrapper.appendChild(dot_div)
    
                dot_div.style.cssText = `position: absolute; top: 70%; left: 50%; transform: translateX(-50%) translateY(70%); display:flex; justify-content: center; align-items: center; flex-wrap: wrap;`
    
                //generate dot each child
                child_arr.forEach((item, num)=>{
                    let dot = document.createElement('span')
                    dot.classList.add('slideinfo_dot')
                    
                    //set active to first dot
                    if(num === 0){
                        dot.classList.add('slideinfo_dot_active')
                    }
                    
                    dot.dataset.slideinfo_dot_index = num
                    dot_div.appendChild(dot)
                })
    
    
                //for Animation
                function animation(){
    
                    let timer
                    let interval = 150
                    let timeout
                    let time_counter = 0
                    let active_child = 0
                    let active_image = 'imageIn'
                    let container_width = container.clientWidth + container.clientWidth
                    let width_image_one = container.clientWidth
                    let width_image_two = container.clientWidth
                    let pos = 0
                    let transition = container_width / 2
                    let transition_counter = 0
                    let transition_duration = 10
    
                    // console.log(container_width, "containef")
                    
                    // while (active_child <= child_arr.length) {
                    //     active_child++
                    // }
                    // if(active_child > child_arr.length){
                    //     active_child = 0
                    //     animation()
                    // }
    
                    function iterate_child(){
    
                        timer = window.requestAnimationFrame(iterate_child)
    
                        function animate(){
                            time_counter++
                            if(time_counter >= interval){
    
                                cancelAnimationFrame(timer)
                                // console.log(timer)
    
                                //check if active_child is not last child
                                if(active_child != child_arr.length -1){
                                    active_child++
    
                                    //set dot to active one
                                    let dot_element = container.querySelectorAll('[data-slideinfo_dot_index')
                                    // console.log(dot_element, "dot element")
                                    dot_element.forEach((item)=>{
                                        item.classList.remove('slideinfo_dot_active')
                                        if(item.dataset.slideinfo_dot_index == `${active_child}`){
                                            item.classList.add('slideinfo_dot_active')
                                        }
                                    })
    
                                    if(active_image == 'imageIn'){
                                        //set image to imageOut
                                        imageOut.src = child_arr[active_child].image
    
                                        //check transition
                                        let transition_interval = setInterval(() => {
                                            if(transition_counter < transition){
                                                transition_counter += 10
                                                pos += 10
                                                if(pos <= container_width){
                                                    // console.log(pos, "pos")
                                                    imageIn.style.left = `${-pos}` + 'px'
                                                    imageOut.style.left = `${-pos}` + 'px'
                                                }
                                                else{
                                                    // console.log('skip in')
                                                    pos = 0
                                                    // imageIn.style.left = `${container_width}` + 'px'
                                                }
                                            }
                                            else{
                                                clearInterval(transition_interval)
                                                transition_counter = 0
                                                timer = window.requestAnimationFrame(iterate_child)
    
                                                //set imageIn to left
                                                // console.log(container_width, "width")
                                                imageIn.style.left = `${container_width / 2}` + 'px'
    
                                                //set active_image to imageOut
                                                active_image = 'imageOut'
                                            }                            
                                        }, 10);
    
                                        //set title text
                                        title.textContent = child_arr[active_child].title
    
                                        //set details text
                                        info.textContent = child_arr[active_child].info
                                        
                                        // console.dir(container)
                                    }
                                    else if(active_image == 'imageOut'){
    
                                        // console.log("ImageOut")
    
                                        //set image to imageOut
                                        imageIn.src = child_arr[active_child].image
                                        // console.log(imageIn, "imageIn")
    
                                        //check transition
                                        let transition_interval = setInterval(() => {
                                            if(transition_counter < transition){
                                                transition_counter += 10
                                                pos += 10
                                                if(pos < container_width){
                                                    
                                                    // console.log(pos, "pos")
                                                    imageOut.style.left = `${-pos}` + 'px'
                                                    imageIn.style.left = `${-(pos - container_width)}` + 'px'
                                                }
                                                else{
                                                    // console.log('skip out')
                                                    pos = 0
                                                    // imageIn.style.left = `${container_width}` + 'px'
                                                }
                                            }
                                            else{
                                                clearInterval(transition_interval)
                                                transition_counter = 0
                                                timer = window.requestAnimationFrame(iterate_child)
    
                                                //set imageIn to left
                                                // console.log(container_width, "width")
                                                imageOut.style.left = `${0}` + 'px'
    
                                                //set active_image to imageOut
                                                active_image = 'imageIn'
                                            }                            
                                        }, 10);
    
                                        //set title text
                                        title.textContent = child_arr[active_child].title
    
                                        //set details text
                                        info.textContent = child_arr[active_child].info
                                        
                                        // console.dir(container)
                                    }
                                    // imageIn.src = child_arr[active_child].image
                                }
                                else{
                                    active_child = -1
                                    // imageIn.src = child_arr[active_child].image
                                    // console.log("end slide")
                                    // time_counter = 0
                                    timer = window.requestAnimationFrame(iterate_child)
                                }
    
                                time_counter = 0
                                // timer = window.requestAnimationFrame(iterate_child)
                            }
                        }
                        animate()
    
    
                    }
                    iterate_child()
                }
                animation()
    
            }
        }
    
        //get all the class containing slide-info-parent
        let parent_class = document.querySelectorAll('.slideinfo_parent')
        const parent = Array.from(parent_class)
    
        //check if parents are available
        if(parent.length == 0) return
    
        //loop through all parent element
        for (let i = 0; i < parent.length; i++) {
            const element = parent[i];
        
            //get feather color
            let feather_color = element.dataset.slideinfo_feather_color
            let title_color = element.dataset.slideinfo_title_color
            let detail_color = element.dataset.slideinfo_detail_color
    
            new Slider(element, feather_color, title_color, detail_color)
            
        }
    
    
        //create stylesheet for this script
        let style_sheet = document.createElement('style')
        style_sheet.innerHTML = `
            .slideinfo_parent{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .slideinfo_dot{
                display: inline-flex; 
                width: 15px; 
                height: 15px; 
                background-color: white;
                border-radius: 50%;
                margin: 3px;
            }
    
            .slideinfo_dot_active{
                width: 30px; 
                height: 10px; 
                background-color: yellow;
                border-radius: 5%;
                margin: 3px;
            }
        `
    
        //append style to head or body
        if(document.head){
            document.head.appendChild(style_sheet)
        }
        else{
            document.body.appendChild(style_sheet)
        }
        
    }
    slideinfo()
    // export{
    //     slideinfo
    // }
}

