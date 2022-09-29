1.toBeGreaterThan
    相当于 > (大于号)

    ex.
        const count = 8

        expect(count).toBeGreaterThan(9)
        测试结果通不过

2.toBeLessThan
    相当于 < (小于号)

    ex.
        const count = 8

        expect(count).toBeLessThan(9)
        测试结果通过

3.toBeLessThanOrEqual/toBeGreaterThanOrEqual
    相当于 <= (小于等于号)/相当于 >= (大于等于号)

    ex.
        const count = 8

        expect(count).toBeLessThanOrEqual(8)
        测试结果通过

    ex.
        const count = 8

        expect(count).toBeGreaterThanOrEqual(8)
        测试结果通过

4.toBeCloseTo
    解决浮点错误

    ex.
        const a = 0.1
        const b = 0.2

        expect(a + b).toBeCloseTo(0.3)
        测试结果通过

        expect(a + b).toEqual(0.3)
        测试结果通不过

5.toBeNull
    值为null

    ex.
        const a = null

        expect(a).toBeNull()
        测试结果通过

6.toBeUndefined
    值为undefined

    ex.
        const a = undefined

        expect(a).toBeUndefined()
        测试结果通过

7.toBeTruthy
    值为true

    ex.
        const a = 1

        expect(a).toBeTruthy()
        测试结果通过

8.toBeFalsy
    值为false

    ex.
        const a = 1

        expect(a).toBeFalsy()
        测试结果通过

9.toMatch
    匹配字符串

    ex.
        const a = "小明，小红，小黄"

        expect(a).toMatch("小红")
        测试结果通过

10.toContain
    匹配数组

    ex.
        const arr = ["小明"，"小红"，"小黄"]

        expect(arr).toContain("小红")
        测试结果通过

11.toThrow
    检查异常

    ex.
        const throwNewErrorFun = () => {
            throw new Error ('this is Err')
        }

        expect(throwNewErrorFun).toThrow('this is Err')
        测试结果通过
