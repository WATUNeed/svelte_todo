<script>
    console.log($$slots)
</script>

<div>
    <header class="header-container">
        <slot name="header" greeting="Hello stanger!"></slot>
    </header>

    <main class="content-container">
        <slot></slot>
    </main>

    <footer class="footer-container">
        <slot name="footer">
           Thank you!
        </slot>
    </footer>
</div>

<style>
    .header-container {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content-container {
        padding: 10px;
    }

    .footer-container {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>