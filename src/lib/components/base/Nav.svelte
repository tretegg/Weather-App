<script lang="ts">

</script>

<nav class="navbar h-[5%]">
    <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/news">News</a></li>
    </ul>
</nav>

<style lang="postcss">


    .navbar {
        position: sticky;
        top: 0;
        background-color: #333;
        padding: 10px 0;
        z-index: 1000;
    }
    
    .navbar .nav-links {
        list-style: none;
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 0;
    }
    
    .navbar .nav-links li {
        margin: 0 20px;
    }
    
    .navbar .nav-links a {
        text-decoration: none;
        color: white;
        font-size: 18px;
        padding: 8px 12px;
        transition: background 0.3s;
        border-radius: 4px;
    }
    
    .navbar .nav-links a:hover {
        background-color: #575757;
    }
    
    </style>