<template>
   <el-breadcrumb>
        <el-breadcrumb-item v-for="key in pathData" :key="key.key" :to="{ path: key.path }">
          {{key.title}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props: {
        pathData: {
            type: Array,
            default: () => {
                return [{
                    title: 'Sample',
                    path: '/'
                },{
                    title: 'Sample',
                    path: '/'
                },{
                    title: 'Sample',
                    path: '/'
                }]
            }
        }
    }
}
</script>

<style>

</style>