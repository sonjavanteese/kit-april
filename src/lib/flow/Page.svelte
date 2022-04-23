<script>
    import {slide} from 'svelte/transition';
    import { quintIn ,quintOut } from 'svelte/easing';
    const op_dura = 400;
    const op_out = {duration: op_dura, easing: quintOut};
    const op_in = {duration: op_dura, easing: quintIn}
</script>

<section out:slide={op_out} in:slide={op_in}>
    <slot name="topbar"></slot>
    <article {...$$restProps}>
        <slot></slot>
    </article>
</section>

<style>
    section {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--app-body-bg, #ffffff);
        color: var(--app-body-color, #444444);
    }
    article {
        flex: 1;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>