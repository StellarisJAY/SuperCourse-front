<template>
  <div>
    <a-menu mode="horizontal" class="header" style="height:100%">
      <a-menu-item class="menu-item">
          <span>
              <a-badge dot>
            <a-avatar size="medium">
              U
            </a-avatar>
          </a-badge>
          </span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "NavbarTopTeacher",
  data() {
    return {};
  },
};
</script>

<style scoped>
.logo {
  font-size: 20px;
  font-weight: 700;
}
.menu-item {
  float: right;
}
.menu-item-text{
    font-weight: 800;
}
.header{
  background-color: lightseagreen;
  box-shadow: 0 2px 8px #f0f1f2;
}
</style>
